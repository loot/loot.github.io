'use strict';
import { load } from 'https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.mjs';
import TOML from 'https://cdn.skypack.dev/-/@ltd/j-toml@v1.33.3-g895G5Q2ba82bha6HlB9/dist=es2019,mode=imports/optimized/@ltd/j-toml.js';

function upgradeOldYaml(yaml) {
    if (yaml['Debug Verbosity'] && !yaml.enableDebugLogging) {
        yaml.enableDebugLogging = yaml['Debug Verbosity'] > 0;
    }

    if (yaml['Update Masterlist'] && !yaml.updateMasterlist) {
        yaml.updateMasterlist = yaml['Update Masterlist'];
    }

    if (yaml.Game && !yaml.game) {
        yaml.game = yaml.Game;
    }

    if (yaml.Language && !yaml.language) {
        yaml.language = yaml.Language;
    }

    if (yaml['Last Game'] && !yaml.lastGame) {
        yaml.lastGame = yaml['Last Game'];
    }

    if (yaml.Games && !yaml.games) {
        yaml.games = yaml.Games;

        yaml.games.forEach(function(game) {
            if (game.url) {
                game.repo = game.url;
                game.branch = 'master';
            }
        });
    }

    return yaml;
}

function yamlToToml(evt) {
    try {
        const settings = upgradeOldYaml(load(evt.target.value));

        const options = {
            indent: 2,
            newline: '\n'
        }
        const toml = TOML.stringify(settings, options);

        document.getElementById('output').value = toml;

        const download = document.getElementById('download');
        download.href = 'data:,' + toml;
        download.textContent = ' - Download';
    } catch (e) {
        console.error(e);
        document.getElementById('output').value = e;
        document.getElementById('download').textContent = '';
    }
}

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    const files = evt.dataTransfer.files; // FileList object.
    const reader = new FileReader();
    reader.onload = function(event) {
        const input = document.getElementById('input');
        input.value = event.target.result;
        input.dispatchEvent(new Event('input'));
    }
    reader.readAsText(files[0], "UTF-8");
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

const input = document.getElementById('input');
input.addEventListener('input', yamlToToml);
input.addEventListener('dragover', handleDragOver, false);
input.addEventListener('drop', handleFileSelect, false);
