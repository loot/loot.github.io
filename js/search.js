'use strict';

// Globals
///////////////////

const repos = [
    [ "Morrowind", "morrowind" ],
    [ "Oblivion", "oblivion" ],
    [ "Nehrim", "oblivion" ],
    [ "Skyrim", "skyrim" ],
    [ "Skyrim SE", "skyrimse" ],
    [ "Skyrim VR", "skyrimvr" ],
    [ "Enderal", "enderal" ],
    [ "Fallout 3", "fallout3" ],
    [ "Fallout: New Vegas", "falloutnv" ],
    [ "Fallout 4", "fallout4" ],
    [ "Fallout 4 VR", "fallout4vr" ],
]

const gameSelect = document.getElementById('gameSelectMenu');
const gameButton = document.getElementById(gameSelect.getAttribute('for'));
const searchButton = document.getElementById('searchButton');
const searchBox = document.getElementById('searchBox');
const resultsDiv = document.getElementById('results');

const newLineRegex = new RegExp('\n', 'g');

// Functions
///////////////////

function isRegexEntry(name) {
    const regChars = [':', '\\', '*', '?', '|'];
    return regChars.some(regChar => name.includes(regChar));
}

function readMasterlist(response) {
    const masterlist = load(response.data);
    document.getElementById('progress').classList.add('hidden');

    /* Do search here. */
    console.log("Starting search.");
    if (masterlist.hasOwnProperty('plugins')) {
        const matches = masterlist.plugins.filter(plugin => {
            if (isRegexEntry(plugin.name)) {
                return RegExp(plugin.name, 'i').test(searchBox.value);
            }

            return plugin.name.toLowerCase().includes(searchBox.value.toLowerCase());
        });

        for (const match of matches) {
            console.log("Match: " + JSON.stringify(match));
            const code = document.createElement('code');
            code.className = 'loot-search-result';
            code.textContent = '  - ' + dump(match).replace(newLineRegex, '\n    ').trim();
            resultsDiv.appendChild(code);
        }
    }

    if (resultsDiv.children.length === 0) {
        const elem = document.createElement('code');
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
for (const repo of repos) {
    const option = document.createElement('li');
    option.className = 'mdl-menu__item';
    option.textContent = repo[0];
    option.setAttribute('data-game', repo[1]);
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
