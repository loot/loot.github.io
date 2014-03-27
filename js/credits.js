
auth = {
    token: "0c5d156093834990d28bfdbc2db9256f2e2ee352",
    auth: "oauth"
}

var github = new Github(auth);

var numRepos = 0;
var numProcessedRepos = 0;
var contributors = [];
var admins = [];
var team = [];

function addToList(listElement, person) {
    var li = document.createElement('li');
    var img = document.createElement('img');
    var span = document.createElement('span');
    img.src = person.avatar_url;
    span.textContent = person.login + ' (' + person.contributions + ')';
    li.appendChild(img);
    li.appendChild(span);
    if (admins.indexOf(person.login) !== -1) {
        span.className = 'admin';
    } else if (team.indexOf(person.login) !== -1) {
        span.className = 'member';
    }
    listElement.appendChild(li);
}

function sortContributors(a,b) {
    return b.contributions - a.contributions;
}

function getContributor(login) {
    for (var i = 0; i < contributors.length; i++) {
        if (contributors[i].login === login) {
            return i;
        }
    }
    return -1;
}

function showContributors(err, data) {
    for (var i = 0; i < data.length; i++) {
        var person = {
            "login":data[i].login,
            "contributions":data[i].contributions,
            "avatar_url":data[i].avatar_url,
        };
        var j = getContributor(person.login);
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
        for (var i = 0; i < contributors.length; i++) {
            addToList(contrib, contributors[i]);
        }
    }
}

function listContributors() {
    var user = github.getUser();
    user.orgRepos('loot', function(err, repos) {
        numRepos = repos.length;
        for (var i = 0; i < repos.length; i++) {
            var repo = github.getRepo('loot', repos[i].name);
            repo.getContributors("1", showContributors);
        }
    });
}

function storeAdmins(err, data) {
    for (var i = 0; i < data.length; i++) {
        admins.push(data[i].login);
    }

    listContributors();
}

function getTeams(err, data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].name === "Owners") {
            github.getUser().teamMembers(data[i].id, storeAdmins);
        }
    }
}

function storeTeamMembers(err, data) {
    for (var i = 0; i < data.length; i++) {
        team.push(data[i].login);
    }

    var user = github.getUser();
    user.orgTeams('loot', getTeams);
}

function getContributors() {
    var user = github.getUser();
    user.orgMembers('loot', storeTeamMembers);
}

getContributors();