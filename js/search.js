'use strict';

// Globals
///////////////////

var repos = [
    [ "Morrowind", "morrowind" ],
    [ "Oblivion", "oblivion" ],
    [ "Nehrim", "oblivion" ],
    [ "Skyrim", "skyrim" ],
    [ "Skyrim SE", "skyrimse" ],
    [ "Skyrim VR", "skyrimvr" ],
    [ "Fallout 3", "fallout3" ],
    [ "Fallout: New Vegas", "falloutnv" ],
    [ "Fallout 4", "fallout4" ],
    [ "Fallout 4 VR", "fallout4vr" ],
]

var repoBranch = 'master';  //The repository branch to search.

var gameSelect = document.getElementById('gameSelectMenu');
var gameButton = document.getElementById(gameSelect.getAttribute('for'));
var searchButton = document.getElementById('searchButton');
var searchBox = document.getElementById('searchBox');
var resultsDiv = document.getElementById('results');

// Functions
///////////////////

function isRegexEntry(name) {
    const regChars = [':', '\\', '*', '?', '|'];
    return regChars.some(regChar => name.includes(regChar));
}

function readMasterlist(response) {
    var masterlist = jsyaml.safeLoad(response.data);
    document.getElementById('progress').classList.add('hidden');

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
                var code = document.createElement('code');
                code.className = 'loot-search-result';
                code.textContent = '  - ' + jsyaml.safeDump(masterlist["plugins"][index]).replace(new RegExp('\n', 'g'), '\n    ').trim();
                resultsDiv.appendChild(code);
            }
        }
    }

    if (resultsDiv.children.length == 0) {
        var elem = document.createElement('code');
        elem.className = 'loot-search-result';
        elem.textContent = "No matching entries found.";
        resultsDiv.appendChild(elem);
    }

    console.log("Search complete.");
}

function onSearchInit(evt) {
    /* Clear any previous search results. */
    while (resultsDiv.children.length > 0) {
        resultsDiv.removeChild(resultsDiv.firstElementChild);
    }

    console.log("Loading masterlist...");
    progress.classList.remove('hidden');

    var repo = (new GitHub())
        .getRepo('loot', gameButton.getAttribute('data-selected'))
        .getContents(undefined, 'masterlist.yaml', true)
        .then(readMasterlist)
        .catch(function() {
            document.getElementById('progress').classList.add('hidden');
        });
}

function onGameSelect(evt) {
    gameButton.textContent = evt.target.textContent;
    gameButton.setAttribute('data-selected', evt.target.getAttribute('data-game'));
}

function getGameName(gameMasterlistRepo) {
    const repo = repos.find((repo) => repo[1] === gameMasterlistRepo);
    if (repo === undefined) {
        return repo;
    }
    return repo[0];
}

function getURLParameters() {
    if (window.location.search.length === 0) {
        return undefined;
    }

    const search = window.location.search.toLowerCase().split('&');

    if (search.length !== 2) {
        return undefined;
    }

    /* Remove the ? prefix */
    search[0] = search[0].substring(1);

    let parameters = {};
    search.forEach((parameter) => {
        if (parameter.startsWith('game=')) {
            parameters.repo = decodeURIComponent(parameter.substring(5));
            parameters.game = getGameName(parameters.repo);
        } else if (parameter.startsWith('search=')) {
            parameters.search = decodeURIComponent(parameter.substring(7));
        }
    });

    if (parameters.search === undefined
        || parameters.repo === undefined
        || parameters.game === undefined) {
        return undefined;
    }

    return parameters;
}

// Startup Code
///////////////////

/* Fill the drop-down games box with stuff. */
for (var i=0; i < repos.length; ++i) {
    var option = document.createElement('li');
    option.className = 'mdl-menu__item';
    option.textContent = repos[i][0];
    option.setAttribute('data-game', repos[i][1]);
    gameSelect.appendChild(option);
    option.addEventListener('click', onGameSelect, false);
}
gameSelect.firstElementChild.click();

searchButton.addEventListener("click", onSearchInit, false);
searchBox.addEventListener('change', onSearchInit, false);

/* If the page was loaded with a PHP-style GET string `?game=<game>&search=<search>`, read it for the search term and perform a search. */
const parameters = getURLParameters();
if (parameters) {
    searchBox.value = parameters.search;
    gameButton.setAttribute('data-selected', parameters.repo);
    gameButton.textContent = parameters.game;

    searchButton.click();
} else {
    gameButton.setAttribute('data-selected', repos[0][1]);
}
