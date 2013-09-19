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

function getRegexLineEnd(line) {
    var pos = line.indexOf("\\.esp");
    if (pos === -1) {
        pos = line.indexOf("\\.esm");
    }
    if (pos !== -1) {
        pos += 5;
    }
    return pos;
}

function onReqLoad() {
    /* Do search here. */
    console.log("Got masterlist");

    console.log("Splitting line-by-line.");

    var lines = this.responseText.split("\n");

    console.log("Starting search.");

    /* Clear any previous search results. */
    while (resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.firstChild);
    }

    var result = null;
    for (var i in lines) {
        var line = lines[i];

        var pos1 = line.indexOf("name:");
        if (pos1 === -1) {
            if (result) {
                result += '\n' + line;
            }
            continue;
        }

        if (result) {
            var elem = document.createElement('code');
            elem.textContent = result;
            resultsDiv.appendChild(elem);

            console.log("Match: " + result);
        }
        result = null;

        var pos2 = getRegexLineEnd(line);
        if (pos2 !== -1) {
            pos1 += 5;

            /* Extract regex from line. */
            var reStr = line.substring(pos1, pos2).trim();
            var re = new RegExp(reStr, "i");

            if (re.test(searchBox.value)) {
                result = line;

                var elem = document.createElement('p');
                elem.textContent = "Line " + i;
                resultsDiv.appendChild(elem);
            }

        } else if (line.toLowerCase().indexOf(searchBox.value.toLowerCase()) !== -1) {
            result = line;

            var elem = document.createElement('p');
            elem.textContent = "Line " + (parseInt(i, 10) + 1);
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

    console.log("Loading masterlist...");
    resultsDiv.textContent = "Loading masterlist...";

    var mlistReq = new XMLHttpRequest();
    mlistReq.onload = onReqLoad;
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
