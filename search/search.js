var masterlists = [
    [ "Oblivion", "https://raw.github.com/boss-developers/boss-oblivion/master/masterlist.yaml" ],
    [ "Skyrim", "http://boss-developers.github.io/boss-skyrim/masterlist.yaml" ],
    [ "Fallout 3", "https://raw.github.com/boss-developers/boss-fallout3/master/masterlist.yaml" ],
    [ "Fallout: New Vegas", "https://raw.github.com/boss-developers/boss-fallout-new-vegas/master/masterlist.yaml" ]
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
            document.body.appendChild(elem);

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
                document.body.appendChild(elem);
            }

        } else if (line.indexOf(searchBox.value) !== -1) {
            result = line;

            var elem = document.createElement('p');
            elem.textContent = "Line " + (i + 1);
            document.body.appendChild(elem);
        }
    }
    console.log("Search complete.");
}

function onSearchInit(evt) {

    if (gameSelect.value.length < 5) {
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
