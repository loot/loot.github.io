'use strict';
var gameSelect = document.getElementById('gameSelect');
var searchButton = document.getElementById('searchButton');
var dateInput = document.getElementById('date');
var resolutionSelect = document.getElementById('resolutionSelect');
var resultsDiv = document.getElementById('results');
var url = 'http://bugzilla.darkcreations.org/jsonrpc.cgi';
var games = [
    [ "TES IV: Oblivion", "http://loot.github.io/oblivion/masterlist.yaml" ],
    [ "TES V: Skyrim", "http://loot.github.io/skyrim/masterlist.yaml" ],
    [ "Fallout 3", "http://loot.github.io/fallout3/masterlist.yaml" ],
    [ "Fallout: New Vegas", "http://loot.github.io/fallout-new-vegas/masterlist.yaml" ]
];
var keywords = [
    'CRC',
    'incompatib',
    'load',
    'require',
    'http',
    /\.es(p|m)/i,
];
var blacklist = [
    'has been marked as a duplicate of this bug. ***',
    'C:\\',
    'F:/',
    /\.(de|ru|com|org)\/?$/i,
    'http://better-oblivion-sorting-software',
    'http://creativecommons.org'
];
var hashmap = {};
var masterlist = {};
var isMasterlistLoaded = false;
var isBugzillaQueried = false;

function isEmpty(obj) {
    for(var i in obj) {
        if(obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}
function contains(str, arr) {
    for (var i in arr) {
        if (typeof(arr[i]) === 'string') {
            if (str.indexOf(arr[i]) > -1) {
                return true;
            }
        } else if (arr[i].test(str)) {
            return true;
        }
    }
    return false;
}

function isRegexEntry(name) {
    var end = name.substring(name.length - 5).toLowerCase();
    if (end == '\\.esp' || end == '\\.esm') {
        return true;
    }
}

function outputBugData(evt) {
    if (!isMasterlistLoaded || !isBugzillaQueried) {
        return;
    }
    
    /* Want to search the masterlist for each plugin and append any missing data. */
    for (var i in hashmap) {
        var index = -1;
        if (masterlist.hasOwnProperty('plugins')) {
            for (var j in masterlist["plugins"]) {
                if (isRegexEntry(masterlist["plugins"][j].name)) {
                    if (RegExp(masterlist["plugins"][j].name, 'i').test(i)) {
                        index = j;
                        break;
                    }
                } else if (i.toLowerCase() == masterlist["plugins"][j].name.toLowerCase()) {
                    index = j;
                    break;
                }
            }
        }
        if (index != -1) {
            if (masterlist["plugins"][index].hasOwnProperty('url')) {
                for (var j in hashmap[i]) {
                    if (masterlist["plugins"][index].url.indexOf(hashmap[i][j]) == -1) {
                        masterlist["plugins"][index].url.push(hashmap[i][j]);
                        console.log('Added URL to "' + masterlist["plugins"][index].name + '": ' + hashmap[i][j]);
                        resultsDiv.textContent += 'Added URL to "' + masterlist["plugins"][index].name + '": ' + hashmap[i][j] + '\n';
                    }
                }
            } else {
                masterlist["plugins"][index].url = hashmap[i][j];
                console.log('Added URL to "' + masterlist["plugins"][index].name + '": ' + hashmap[i][j]);
                resultsDiv.textContent += 'Added URL to "' + masterlist["plugins"][index].name + '": ' + hashmap[i][j] + '\n';
            }
        } else {
            var plugin = {
                "name": i,
                "url": hashmap[i]
            };
            masterlist["plugins"].push(plugin);
            console.log('Added new entry for "' + i + '": ' + JSON.stringify(hashmap[i]));
            resultsDiv.textContent += 'Added new entry for "' + i + '": ' + JSON.stringify(hashmap[i]) + '\n';
        }
    }
    
    document.getElementById('downloadLink').href = 'data:text/plain;base64,' + btoa(unescape(encodeURIComponent(jsyaml.safeDump(masterlist))));
    document.getElementById('downloadLink').textContent = "Download masterlist";
}

function loadMasterlist(evt) {
    
    /* Load masterlist as YAML document. */
    if (evt.target.status !== 200) {
        console.log("Error while getting masterlist.");
        resultsDiv.textContent += "Error while getting masterlist.\n";
        return;
    }
    
    console.log("Loading masterlist...");
    resultsDiv.textContent += "Loading masterlist...\n";
    
    masterlist = jsyaml.safeLoad(evt.target.responseText);
    
    isMasterlistLoaded = true;
    outputBugData();
}

function filterBugData() {
    console.log("Filtering bug comments...");
    resultsDiv.textContent += "Filtering bug comments...\n";

    /* First combine duplicate bugs. */
    var plugins = {};
    for (var i in hashmap) {
        if (plugins.hasOwnProperty(hashmap[i].name)) {
            plugins[hashmap[i].name] = plugins[hashmap[i].name].concat(hashmap[i].comments);
        } else if (hashmap[i].comments.length > 0) {
            plugins[hashmap[i].name] = hashmap[i].comments;
        }
    }
    
    /* Now empty the hashmap and fill it again with filtered URLs. */
    hashmap = {};
    for (var i in plugins) {
        var urls = [];
        for (var j in plugins[i]) {
            if (contains(plugins[i][j], blacklist)) {
                continue;
            }
            
            var splitStr = plugins[i][j].split('\n\n');
            for (var k in splitStr) {
                if (!contains(splitStr[k], keywords)) {
                    continue;
                }
                
                /* Replace the trailing bit of Nexus URLs. */
                splitStr[k] = splitStr[k].replace(/(\/mods\/\d+)\/*\??(#content)?/, "$1");
                
                /* Now add to hashmap. */
                if (urls.indexOf(splitStr[k]) == -1) {
                    urls.push(splitStr[k]);
                }
            }
        }
        
        if (urls.length > 0) {
            hashmap[i] = urls;
        }
    }
    isBugzillaQueried = true;
    outputBugData();
}
function processBugComments(evt) {
    if (evt.target.status == 200 && JSON.parse(evt.target.responseText).error == null) {
        var response = JSON.parse(evt.target.responseText);
        if (!isEmpty(response.result.bugs)) {
            for (var i in response.result.bugs) {
                for (var j in response.result.bugs[i].comments) {
                    hashmap[i].comments.push(response.result.bugs[i].comments[j].text);
                }
            }
            filterBugData();
        } else { 
            console.log("No bug comments found.");
            resultsDiv.textContent = "No bug comments found.";
        }
    } else {
        console.log("Error while getting bug comments list.");
        resultsDiv.textContent = "Error while getting bug comments list.";
    }
}
function processBugIDs(evt) {
    if (evt.target.status == 200 && JSON.parse(evt.target.responseText).error == null) {
        var response = JSON.parse(evt.target.responseText);
        if (response.result.bugs.length > 0) {
            /* Now we have an array of bug objects. However, the info in these objects doesn't include comments, so that'll have to be gotten for the bugs. */
            var ids = [];
            for (var i in response.result.bugs) {
                var id = response.result.bugs[i].id;
                ids.push(id);
                hashmap[id] = {
                    "name": response.result.bugs[i].summary,
                    "comments": []
                };
            }
            
            var date = dateInput.value;
            if (!date) {
                date = '2009-09-09';
            }
            
            var req = {
                "Bugzilla_login": "bossguest@darkcreations.org",
                "Bugzilla_password": "bosspassword",
                "method": "Bug.comments",
                "id": 2,
                "params": [{
                    "ids": ids,
                    "new_since": date + 'T00:00:00Z'
                }]
            };
            
            console.log("Getting comments for bugs...");
            resultsDiv.textContent += "Getting comments for bugs...\n";
            
            try {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener('load', processBugComments, false);
                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(req));
            } catch (err) {
                console.log("Error while getting bug list: " + err.message);
                resultsDiv.textContent = "Error while getting bug list: " + err.message;
            }
            
        } else { 
            console.log("No bugs found.");
            resultsDiv.textContent = "No bugs found.";
        }
    } else {
        console.log("Error while getting bug list.");
        console.log(evt.target.response);
        resultsDiv.textContent = "Error while getting bug list.";
    }
}

function onExtractInit(evt) {

    /* Clear any changes. */
    isMasterlistLoaded = false;
    isBugzillaQueried = false;
    hashmap = {};
    masterlist = {};
    resultsDiv.style.display = "block";

    if (evt.keyCode != 0 && evt.keyCode != 13) {
        return;
    }
    
    var date = dateInput.value;
    if (!date) {
        date = '2009-09-09';
    }
    
    var req = {
        "Bugzilla_login": "bossguest@darkcreations.org",
        "Bugzilla_password": "bosspassword",
        "method": "Bug.search",
        "id": 1,
        "params": [{
            "product": "BOSS",
            "component": gameSelect.value,
            "last_change_time": date + 'T00:00:00Z',
            "resolution": resolutionSelect.value
        }]
    };
    console.log("Getting bug list...");
    resultsDiv.textContent = "Getting bug list...\n";
    
    try {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', processBugIDs, false);
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(req));
    } catch (err) {
        console.log("Error while getting bug list: " + err.message);
        resultsDiv.textContent = "Error while getting bug list: " + err.message;
    }
    
    console.log("Getting masterlist...");
    resultsDiv.textContent += "Getting masterlist...\n";
    
    try {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', loadMasterlist, false);
        xhr.open('GET', games[ gameSelect.selectedIndex ][1], true);
        xhr.send();
    } catch (err) {
        console.log("Error while getting masterlist: " + err.message);
        resultsDiv.textContent = "Error while getting masterlist: " + err.message;
    }
}

/* Fill the drop-down games box with stuff. */
for (var i in games) {
    var option = document.createElement('option');
    option.innerText = games[i][0];
    option.setAttribute('value', games[i][0]);
    gameSelect.appendChild(option);
}

searchButton.addEventListener("click", onExtractInit, false);
document.body.addEventListener("keypress", onExtractInit, false);
