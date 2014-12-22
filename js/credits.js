
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
    var li = document.createElement('paper-item');
    var a = document.createElement('a');
    var img = document.createElement('img');
    var div = document.createElement('div');
    var primarySpan = document.createElement('span');
    var secondarySpan = document.createElement('span');

    li.classList.add('two-line', 'grid');

    a.setAttribute('layout', '');
    a.setAttribute('vertical', '');

    img.className = 'avatar';
    div.className = 'text';
    primarySpan.className = 'primary';
    secondarySpan.className = 'secondary';

    a.href = person.html_url;
    img.src = person.avatar_url;
    primarySpan.textContent = person.login;
    secondarySpan.textContent = person.contributions + ' contributions';

    if (admins.indexOf(person.login) !== -1) {
        li.classList.add('admin');
    } else if (team.indexOf(person.login) !== -1) {
        li.classList.add('member');
    }
    li.appendChild(a);
    a.appendChild(img);
    a.appendChild(div);
    div.appendChild(primarySpan);
    div.appendChild(document.createElement('br'));
    div.appendChild(secondarySpan);
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
    if (err) {
        console.log(err);
        return;
    }

    for (var i = 0; i < data.length; i++) {
        var person = {
            "login":data[i].login,
            "contributions":data[i].contributions,
            "avatar_url":data[i].avatar_url,
            "html_url":data[i].html_url,
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
        contrib.removeChild(contrib.firstElementChild);
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
    if (err) {
        console.log(err);
        return;
    }

    for (var i = 0; i < data.length; i++) {
        admins.push(data[i].login);
    }

    listContributors();
}

function getTeams(err, data) {
    if (err) {
        console.log(err);
        return;
    }

    for (var i = 0; i < data.length; i++) {
        if (data[i].name === "Owners") {
            github.getUser().teamMembers(data[i].id, storeAdmins);
        }
    }
}

function storeTeamMembers(err, data) {
    if (err) {
        console.log(err);
        return;
    }

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
