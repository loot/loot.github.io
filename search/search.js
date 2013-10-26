var masterlists = [
    [ "Oblivion", "http://boss-developers.github.io/boss-oblivion/masterlist.yaml" ],
    [ "Skyrim", "http://boss-developers.github.io/boss-skyrim/masterlist.yaml" ],
    [ "Fallout 3", "http://boss-developers.github.io/boss-fallout3/masterlist.yaml" ],
    [ "Fallout: New Vegas", "http://boss-developers.github.io/boss-fallout-new-vegas/masterlist.yaml" ]
]

var gameSelect = document.getElementById('gameSelect');
var searchButton = document.getElementById('searchButton');
var searchBox = document.getElementById('searchBox');
var resultsDiv = document.getElementById('results');

function isRegexEntry(name) {
    var end = name.substring(name.length - 5).toLowerCase();
    if (end == '\\.esp' || end == '\\.esm') {
        return true;
    }
}

function onReqLoad(evt) {

    /* Clear any previous search results. */
    while (resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.firstChild);
    }
    
    console.log("Loading masterlist...");
    resultsDiv.textContent = "Loading masterlist...\n";
    var masterlist = jsyaml.safeLoad(evt.target.responseText);

    /* Do search here. */
    console.log("Starting search.");
    if (masterlist.hasOwnProperty('plugins')) {
        var index = -1;
        for (var i in masterlist['plugins']) {
            if (isRegexEntry(masterlist["plugins"][i].name)) {
                if (RegExp(masterlist["plugins"][i].name, 'i').test(searchBox.value)) {
                    index = i;
                    break;
                }
            } else if (masterlist["plugins"][i].name.toLowerCase().indexOf(searchBox.value.toLowerCase()) !== -1) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            console.log("Match: " + JSON.serialise(masterlist["plugins"][index]));
            var elem = document.createElement('code');
            elem.textContent = '  - ' + jsyaml.safeDump(masterlist["plugins"][index]).replace('\n', '\n  ');
            resultsDiv.appendChild(elem);
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

    var mlistReq = new XMLHttpRequest();
    mlistReq.addEventListener('load', onReqLoad, false);
    mlistReq.open("get", gameSelect.value, true);
    mlistReq.send();
}

/* Fill the drop-down games box with stuff. */
for (var i=0; i < masterlists.length; ++i) {
    var option = document.createElement('option');
    option.innerText = masterlists[i][0];
    option.setAttribute('value', masterlists[i][1]);
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
        gameSelect.value = masterlists[0][1];
    } else if (game == "skyrim") {
        gameSelect.value = masterlists[1][1];
    } else if (game == "fallout3") {
        gameSelect.value = masterlists[2][1];
    } else if (game == "falloutnv") {
        gameSelect.value = masterlists[3][1];
    }

    searchButton.click();
}
