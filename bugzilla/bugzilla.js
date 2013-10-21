'use strict';
var gameSelect = document.getElementById('gameSelect');
var searchButton = document.getElementById('searchButton');
var resultsDiv = document.getElementById('results');
var url = 'http://bugzilla.darkcreations.org/jsonrpc.cgi';
var games = [
    "TES IV: Oblivion",
    "TES V: Skyrim",
    "Fallout 3",
    "Fallout: New Vegas"
];
var hashmap = {};

function outputBugData() {
    for (var i in hashmap) {
        console.log(hashmap[i]);
    }
}

function processBugComments() {
    if (this.status == 200 && JSON.parse(this.responseText).error == null) {
        var response = JSON.parse(this.responseText);
        if (response.result.bugs.length > 0) {
            for (var i in response.result.bugs) {
                hashmap[i].comments = response.result.bugs[i].comments;
            }
            outputBugData();
        } else { 
            console.log("No bug comments found.");
            resultsDiv.textContent = "No bug comments found.";
        }
    } else {
        console.log("Error while getting bug comments list.");
        resultsDiv.textContent = "Error while getting bug comments list.";
    }
}

function processBugIDs() {
    if (this.status == 200 && JSON.parse(this.responseText).error == null) {
        var response = JSON.parse(this.responseText);
        if (response.result.bugs.length > 0) {
            /* Now we have an array of bug objects. However, the info in these objects doesn't include comments, so that'll have to be gotten for the bugs. */
            var ids = [];
            for (var i=0; i < response.result.bugs.length; ++i) {
                var id = response.result.bugs[i].id;
                ids[i] = id;
                hashmap[id] = {
                    "name": response.result.bugs[i].summary,
                    "comments": []
                };
                console.log("\t" + response.result.bugs[i].id);
            }
            
            var req = {
                "Bugzilla_login": "bossguest@darkcreations.org",
                "Bugzilla_password": "bosspassword",
                "method": "Bug.comments",
                "id": 2,
                "params": [{
                    "ids": ids
                }]
            };
            
            console.log("Getting comments for bugs...");
            resultsDiv.textContent = "Getting comments for bugs...";
            
            try {
                this.onload = processBugComments;
                this.open('POST', url, true);
                this.setRequestHeader('Content-Type', 'application/json');
                this.send(JSON.stringify(req));
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
        resultsDiv.textContent = "Error while getting bug list.";
    }
}

function onExtractInit(evt) {

    if (evt.keyCode != 0 && evt.keyCode != 13) {
        return;
    }
    
    var req = {
        "Bugzilla_login": "bossguest@darkcreations.org",
        "Bugzilla_password": "bosspassword",
        "method": "Bug.search",
        "id": 1,
        "params": [{
            "product": "BOSS",
            "component": gameSelect.value,
            "limit": 0,
        }]
    };

    console.log("Getting bug list...");
    resultsDiv.textContent = "Getting bug list...";
    
    try {
        var xhr = new XMLHttpRequest();
        xhr.onload = processBugIDs;
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(req));
    } catch (err) {
        console.log("Error while getting bug list: " + err.message);
        resultsDiv.textContent = "Error while getting bug list: " + err.message;
    }
}

/* Fill the drop-down games box with stuff. */
for (var i=0; i < games.length; ++i) {
    var option = document.createElement('option');
    option.innerText = games[i];
    option.setAttribute('value', games[i]);
    gameSelect.appendChild(option);
}

searchButton.addEventListener("click", onExtractInit, false);
document.body.addEventListener("keypress", onExtractInit, false);