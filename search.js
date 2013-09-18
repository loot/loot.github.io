var masterlists = [
    [ "Oblivion", "https://raw.github.com/boss-developers/boss-oblivion/master/masterlist.yaml" ],
    [ "Skyrim", "http://boss-developers.github.io/boss-skyrim/masterlist.yaml" ],
    [ "Fallout 3", "https://raw.github.com/boss-developers/boss-fallout3/master/masterlist.yaml" ],
    [ "Fallout: New Vegas", "https://raw.github.com/boss-developers/boss-fallout-new-vegas/master/masterlist.yaml" ]
]


var gameSelect = document.getElementById('gameSelect');
var searchButton = document.getElementById('searchButton');
var searchBox = document.getElementById('searchBox');

function getRegexLineEnd(line) {
    var pos = line.indexOf("\\.esp", line.length - 5);
    if (pos === -1) {
        pos = line.indexOf("\\.esm", line.length - 5);
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

    for (var i in lines) {
        var line = lines[i];

        var pos1 = line.indexOf("name:");
        if (pos1 === -1) {
            continue;
        }


        var found = false;
        var pos2 = getRegexLineEnd(line);
        if (pos2 !== -1) {


            /* Extract regex from line. */
            line.substring(pos1, pos2 - pos1);
            console.log("Extracted " + line);
            var re = new RegExp(line, "i");

            if (re.test(searchBox.value)) {
                found = true;
            }

        } else if (line.indexOf(searchBox.value) !== -1) {
            found = true;
        }

        if (found) {
            console.log(line);
        }
    }
    console.log("Search complete.");
}

function onSearchInit(evt) {

    console.log("Loading masterlist...");

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

document.getElementById("searchButton").addEventListener("click", onSearchInit, false);

console.log("\\.esp");
