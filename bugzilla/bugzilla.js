'use strict';
var url = 'http://bugzilla.darkcreations.org/jsonrpc.cgi';
function getBugId(plugin, desc, xhr) {
    var request = {
        "method": "Bug.search",
        "params": [{
            "Bugzilla_login": "bossguest@darkcreations.org",
            "Bugzilla_password": "bosspassword",
            "product": "BOSS",
            "component": "TES V: Skyrim",
            "summary": plugin
        }],
        "id": 1
    };
    outputPluginSubmitText('Checking for existing submission...', 0);
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onerror = pluginSubmitError;
    xhr.onload = function() {
        if (xhr.status == 200 && isResponseOK(xhr.responseText)) {
            var response = JSON.parse(xhr.responseText);
            if (response.result.bugs.length > 0) {
                var id = response.result.bugs[0].id;
                addBugComment(id, desc, xhr);
            } else {
                addBug(plugin, desc, xhr);
            }
        } else {
            outputPluginSubmitText('Error: Existing submission check failed!', -1);
        }
    };
    xhr.send(JSON.stringify(request));
}
function addBugComment(id, comment, xhr) {
    var request = {
        "method": "Bug.add_comment",
        "params": [{
            "Bugzilla_login": "bossguest@darkcreations.org",
            "Bugzilla_password": "bosspassword",
            "id": id,
            "comment": comment
        }],
        "id": 2
    };
    outputPluginSubmitText('Previous submission found, updating with supplied details...', 0);
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onerror = pluginSubmitError;
    xhr.onload = function() {
        if (xhr.status == 200 && isResponseOK(xhr.responseText)) {
            outputPluginSubmitText('Plugin submission updated!', 1);
        } else {
            outputPluginSubmitText('Error: Plugin submission could not be updated.', -1);
        }
    };
    xhr.send(JSON.stringify(request));
}
function addBug(summary, description, xhr) {
    var request = {
        "method": "Bug.create",
        "params": [{
            "Bugzilla_login": "bossguest@darkcreations.org",
            "Bugzilla_password": "bosspassword",
            "product": "BOSS",
            "component": "TES V: Skyrim",
            "summary": summary,
            "version": "2.1",
            "description": description,
            "op_sys": "Windows",
            "platform": "PC",
            "priority": "---",
            "severity": "enhancement"
        }],
        "id": 3
    };
    outputPluginSubmitText('No previous submission found, creating new submission...', 0);
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onerror = pluginSubmitError;
    xhr.onload = function() {
        if (xhr.status == 200 && isResponseOK(xhr.responseText)) {
            outputPluginSubmitText('Plugin submitted!', 1);
        } else {
            outputPluginSubmitText('Error: Plugin could not be submitted.', -1);
        }
    };
    xhr.send(JSON.stringify(request));
}
function pluginSubmitError() {
    outputPluginSubmitText('Error: Data transfer failed.', -1);
}
function isResponseOK(text) {
    return (JSON.parse(text).error == null);
}
function HTMLToJSON(text) {
    return text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '\"').replace(/&#039;/g, '\'');
}
function submitPlugin(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    if (evt.currentTarget[0].value.length == 0 && evt.currentTarget[1].value.length == 0) {
        outputPluginSubmitText('Please supply at least a link or some notes.', -2);
        return;
    } else if (isValidationSupported() && !evt.currentTarget.checkValidity()) {
        return;
    }
    var desc = evt.currentTarget[0].value;
    if (desc.length != 0) {
        desc += '\n\n';
    }
    desc += evt.currentTarget[1].value;
    try {
        var xhr = new XMLHttpRequest();
        getBugId(HTMLToJSON(document.getElementById('plugin').textContent), HTMLToJSON(desc), xhr);
    } catch (err) {
        outputPluginSubmitText('Exception occurred: ' + err.message, -1);
    }
}