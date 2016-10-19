'use strict';

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

function storeRepositoryContributors(response) {
    response.data.forEach(function(contributor) {
        var stats = {
            contributions: contributor.total
        }
        if (contributor.author.type == 'Anonymous') {
            // Doesn't have a GitHub account. Leave avatar URL undefined.
            stats.name = contributor.author.name;
            stats.html_url = 'mailto:' + contributor.author.email;
        } else {
            stats.name = contributor.author.login;
            stats.avatar_url = contributor.author.avatar_url;
            stats.html_url = contributor.author.html_url;
        }
        var j = getContributor(stats.name);
        if (j === -1) {
            contributors.push(stats);
        } else {
            contributors[j].contributions += stats.contributions;
        }
    });
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

function getContributors(response) {
    numRepos = 0;

    var github = new GitHub({token: '711e78a5aa9dbb24b57963e98ec0fdf15a415dc5'});
    response.data.filter(function(repo) {
        return !repo.fork;
    }).forEach(function(repo) {
        github.getRepo('loot', repo.name)
            .getContributors().then(storeRepositoryContributors);
        numRepos += 1;
    });
}

// Now fetch the organisation repositories.
(new GitHub({token: '711e78a5aa9dbb24b57963e98ec0fdf15a415dc5'})).getOrganization('loot').getRepos().then(getContributors);
