//Uses the github.js API at https://github.com/michael/github.

//Globals
///////////////////

//The OAuth token is for loot-automaton.
auth = {
    token: "1ca3e4455b74f9b00df02b9f4f0eab0294a08928",
    auth: "oauth"
}

repos = [
    [ "Oblivion", "oblivion" ],
    [ "Skyrim", "skyrim" ],
    [ "Fallout 3", "fallout3" ],
    [ "Fallout: New Vegas", "falloutnv" ]
]

var github = new Github(auth);
var repoBranch = 'master';  //The repository branch to search.

var gameSelect = document.getElementById('gameSelect');
var searchButton = document.getElementById('searchButton');
var searchBox = document.getElementById('searchBox');
var resultsDiv = document.getElementById('results');

//Functions
///////////////////

function isRegexEntry(name) {
    var end = name.substring(name.length - 5).toLowerCase();
    if (end == '\\.esp' || end == '\\.esm') {
        return true;
    }
}

function readMasterlist(err, data) {
    if (err !== null) {
        console.log(err);
        return;
    }

    var masterlist = jsyaml.safeLoad(data);

    /* Clear any previous search results. */
    while (resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.firstChild);
    }

    /* Do search here. */
    console.log("Starting search.");
    if (masterlist.hasOwnProperty('plugins')) {
        for (var i in masterlist['plugins']) {
            var index = -1;
            if (isRegexEntry(masterlist["plugins"][i].name)) {
                if (RegExp(masterlist["plugins"][i].name, 'i').test(searchBox.value)) {
                    index = i;
                }
            } else if (masterlist["plugins"][i].name.toLowerCase().indexOf(searchBox.value.toLowerCase()) !== -1) {
                index = i;
            }
            if (index != -1) {
                console.log("Match: " + JSON.stringify(masterlist["plugins"][index]));
                var elem = document.createElement('code');
                elem.textContent = '  - ' + jsyaml.safeDump(masterlist["plugins"][index]).replace(new RegExp('\n', 'g'), '\n    ').trim();
                resultsDiv.appendChild(elem);
            }
        }
    }

    if (!resultsDiv.firstChild) {
        var elem = document.createElement('p');
        elem.textContent = "No matching entries found.";
        resultsDiv.appendChild(elem);
    }

    console.log("Search complete.");
}

function onSearchInit(evt) {

    if (evt.keyCode != 0 && evt.keyCode != 13) {
        return;
    }

    var repo = github.getRepo("loot", gameSelect.value);
    repo.read(repoBranch, 'masterlist.yaml', readMasterlist);

    console.log("Loading masterlist...");
    resultsDiv.textContent = "Loading masterlist...\n";
}

//Startup Code
///////////////////

/* Fill the drop-down games box with stuff. */
for (var i=0; i < repos.length; ++i) {
    var option = document.createElement('option');
    option.innerText = repos[i][0];
    option.setAttribute('value', repos[i][1]);
    gameSelect.appendChild(option);
}

searchButton.addEventListener("click", onSearchInit, false);
document.body.addEventListener("keypress", onSearchInit, false);

/* If the page was loaded with a PHP-style GET string `?game=<game>&search=<search>`, read it for the search term and perform a search. */
var pos = document.URL.indexOf("?game=");
if (pos != -1) {
    var pos2 = document.URL.indexOf("&search=");
    searchBox.value = document.URL.substring(pos2+8);
    var game = document.URL.substring(pos+6, pos2).toLowerCase();
    if (game == "oblivion") {
        gameSelect.value = repos[0][1];
    } else if (game == "skyrim") {
        gameSelect.value = repos[1][1];
    } else if (game == "fallout3") {
        gameSelect.value = repos[2][1];
    } else if (game == "falloutnv") {
        gameSelect.value = repos[3][1];
    }

    searchButton.click();
}
