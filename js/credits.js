'use strict';
import { Octokit } from "https://cdn.skypack.dev/pin/@octokit/rest@v19.0.4-xPNRCbtf1MpCCpqHe5lx/mode=imports,min/optimized/@octokit/rest.js";
import { throttling } from "https://cdn.skypack.dev/pin/@octokit/plugin-throttling@v4.2.0-q2ZrzGw3H4mnkheWbYZl/mode=imports,min/optimized/@octokit/plugin-throttling.js";

function addToList(listElement, person) {
    const a = document.createElement('a');
    const avatar = document.createElement('div');
    const text = document.createElement('div');
    const name = document.createElement('div');
    const contributions = document.createElement('div');

    a.classList.add('loot-contributor', 'mdl-shadow--2dp');

    avatar.className = 'loot-contributor__avatar';
    text.className = 'loot-contributor__text';
    name.className = 'loot-contributor__name';
    contributions.className = 'loot-contributor__contributions';

    a.href = person.html_url;
    name.textContent = person.name;
    contributions.textContent = person.contributions + ' contributions';

    if (person.avatar_url) {
        const img = document.createElement('img');
        img.src = person.avatar_url;
        avatar.appendChild(img);
    } else {
        const icon = document.createElement('i');
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

function getStats(contributor) {
    const isAnon = contributor.type === 'Anonymous';
    return {
        contributions: contributor.contributions,
        name: isAnon ? contributor.name : contributor.login,
        avatar_url: isAnon ? undefined : contributor.avatar_url,
        html_url: isAnon ? 'mailto:' + contributor.email : contributor.html_url
    };
}

function statsReducer(previous, current) {
    const existing = previous.find(element => element.name === current.name);
    if (existing === undefined) {
        return previous.concat(current);
    }

    existing.contributions += current.contributions;
    return previous;
}

function displayContributorsStats(contributorsStats) {
    const contrib = document.getElementById('contrib');
    contrib.removeChild(contrib.firstElementChild);

    for (const contributor of contributorsStats) {
        addToList(contrib, contributor);
    }
}

function getContributorsStats(contributors) {
    return contributors
        .map(getStats)
        .reduce(statsReducer, [])
        .sort(sortContributors);
}

async function getContributors() {
    const ThrottledOctokit = Octokit.plugin(throttling);

    const octokit = new ThrottledOctokit({
        throttle: {
            onAbuseLimit: () => true,
            onRateLimit: () => true
        }
    });

    const repos = await octokit.paginate(octokit.rest.repos.listForOrg, {
        org: 'loot'
    });

    const promises = repos
        .filter(repo => !repo.fork)
        .map(repo => octokit.paginate(octokit.rest.repos.listContributors, {
            owner: 'loot',
            repo: repo.name,
            anon: true
        }));

    return Promise.all(promises).then(results => results.flat());
}

async function getAndDisplayContributorsStats() {
    const contributors = await getContributors();

    const stats = getContributorsStats(contributors);

    displayContributorsStats(stats);
}

getAndDisplayContributorsStats();
