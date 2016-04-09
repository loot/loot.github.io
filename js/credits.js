'use strict';

var github = new Octokat();

var numRepos = 0;
var numProcessedRepos = 0;
var contributors = [];

function addToList(listElement, person) {
    var a = document.createElement('a');
    var avatar = document.createElement('div');
    var text = document.createElement('div');
    var name = document.createElement('div');
    var contributions = document.createElement('div');

    a.classList.add('loot-contributor', 'mdl-shadow--2dp');

    avatar.className = 'loot-contributor__avatar';
    text.className = 'loot-contributor__text';
    name.className = 'loot-contributor__name';
    contributions.className = 'loot-contributor__contributions';

    a.href = person.html_url;
    name.textContent = person.name;
    contributions.textContent = person.contributions + ' contributions';

    if (person.avatar_url) {
        var img = document.createElement('img');
        img.src = person.avatar_url;
        avatar.appendChild(img);
    } else {
        var icon = document.createElement('i');
        icon.className = 'material-icons';
        icon.textContent = 'face';
        avatar.appendChild(icon);
    }

    a.appendChild(avatar);
    a.appendChild(text);
    text.appendChild(name);
    text.appendChild(contributions);
    listElement.appendChild(a);
}

function sortContributors(a,b) {
    if (a.contributions != b.contributions) {
        return b.contributions - a.contributions;
    } else {
        return a.name.localeCompare(b.name);
    }
}

function getContributor(name) {
    for (var i = 0; i < contributors.length; ++i) {
        if (contributors[i].name === name) {
            return i;
        }
    }
    return -1;
}

function storeRepositoryContributors(err, persons) {
    if (err) {
        console.log(err);
        return;
    }

    for (var i = 0; i < persons.length; ++i) {
        var person = {
            contributions: persons[i].contributions
        };
        if (persons[i].type == 'Anonymous') {
            // Doesn't have a GitHub account. Leave avatar URL undefined.
            person.name = persons[i].name;
            person.html_url = 'mailto:' + persons[i].email;
        } else {
            person.name = persons[i].login;
            person.avatar_url = persons[i].avatar.url;
            person.html_url = persons[i].html.url;
        }
        var j = getContributor(person.name);
        if (j === -1) {
            contributors.push(person);
        } else {
            contributors[j].contributions += person.contributions;
        }
    }
    numProcessedRepos += 1;

    if (numProcessedRepos === numRepos) {
        var contrib = document.getElementById('contrib');
        contributors.sort(sortContributors);
        contrib.removeChild(contrib.firstElementChild);
        for (var i = 0; i < contributors.length; i++) {
            addToList(contrib, contributors[i]);
        }
    }
}

function getRepositoriesContributors(err, repos) {
    if (err) {
        console.log(err);
        return;
    }

    // Record number of repositories.
    numRepos = repos.length;

    for (var i = 0; i < repos.length; ++i) {
        github.repos('loot', repos[i].name).contributors.fetch({anon: true},
            storeRepositoryContributors);
    }
}

// Now fetch the organisation repositories.
github.orgs('loot').repos.fetch({type: 'sources'}, getRepositoriesContributors);
