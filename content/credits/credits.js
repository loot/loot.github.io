import { Octokit } from '/js/octokit.js';

// Commit 37e464f6001d440ae532516f40fe19162537475a and earlier are common
// between the loot and libloot repositories, so are double-counted by GitHub.
// The same is true for commit 765be028964746022f1e3540524044b855ac130c in the
// skyrimse and skyrimvr repos, and for commit
// dd6b20985de3cbdee1689d4580590850c0120fb5 in the fallout4 and fallout4vr
// repos.
const duplicateContributions = new Map([
    // (loot/libloot) + (skyrimse/skyrimvr) + (fallout4/fallout4vr)
    ['Ortham', (1674 + 1028) + (96 + 1) + (42 + 1)],
    ['TokcDK', (25 + 3) + (1) + (0)],
    ['Freso', (26 + 24 + 3) + (8 + 2) + (231 + 1 + 1)],
    ['Trollmen', 22],
    ['Sharlikran', (13) + (31) + (50)],
    ['lpradel', 12],
    ['silentdark', 11 + 4],
    ['3ventic', (10) + (1) + (0)],
    ['cpasmoi', 5 + 1],
    ['steamb23', 4 + 3],
    ['niveuseverto', 2],
    ['kassane', 2],
    ['Liam Brown', 1],
    ['Lakrits', 1],
    ['MaddBomber83', (1) + (3) + (30)],
    // (skyrimse/skyrimvr) + (fallout4/fallout4vr)
    ['MacSplody', (617 + 598 + 424 + 415) + (106 + 87 + 39 + 15)],
    ['sibir-ine', (93 + 71 + 34 + 7 + 2) + (14 + 10 + 6)],
    ['Infernio', (73) + (3)],
    ['sean-kang', 59],
    ['ddbb07', (53) + (2)],
    ['pStyl3', (37 + 6) + (48 + 47)],
    ['Sabre142', 35],
    ['DaCoolX', (12) + (3)],
    ['themayor897', 10],
    ['flatwhatson', 7],
    ['cecell', 6],
    ['IllusiveMan196', 6],
    ['Xahtax', 6],
    ['omniguous', (6) + (14)],
    ['ExE-Boss', (5) + (1)],
    ['megapatato', 5],
    ['ArtaiosGreybark', 4],
    ['ironmagician', 4],
    ['Qwinn1', 4],
    ['jb29', 4 + 2],
    ['FWDekker', 3],
    ['LostDragonist', 3],
    ['Arthmoor', (2 + 1) + (3)],
    ['BeermotorWB', 2],
    ['BellCubeDev', 2],
    ['FenghuangZero', (2) + (1)],
    ['Nawor3565', 2],
    ['TateTaylorOH', 2],
    ['Riwaha', 2],
    ['simoneddeland', 2 + 1],
    ['Yoosk', 2],
    ['bppipher', 2],
    ['jgostling', 2],
    ['spaceoden', (2) + (1)],
    ['such-dev', (2) + (1)],
    ['ubeogesh', 2],
    ['ChrRubin', 1],
    ['Chef0000', 1],
    ['Daniel Hofheinz', 1],
    ['Deka-O', (1) + (1)],
    ['DomT602', 1],
    ['DoubleYouC', 1],
    ['FelesNoctis', 1],
    ['Spiess', 1],
    ['RacerBG', 1],
    ['GonDragon', 1],
    ['Bl4ckread', 1],
    ['JDCalvert', 1],
    ['jordanbtucker', 1],
    ['Gavvers', 1],
    ['Kinaga', 1],
    ['mrudat', (1) + (1)],
    ['ann4belle', 1],
    ['OddDrifter', 1],
    ['PenguinMancer', 1],
    ['SkyLover264', 1],
    ['Thomas Winwood', 1],
    ['tomtesoro', 1],
    ['Willian Tomaz Nieckarz', 1],
    ['coco9515', 1],
    ['jobobby04', 1],
    ['kuroko137', (1) + (1)],
    ['lucible', 1],
    ['pragasette', 1],
    ['tktk11', 1],
    ['yggdrasil75', 1],
    ['zDasF1xer', 1],
    // fallout4/fallout4vr
    ['Superfly-Johnson', 17],
    ['unforbidable', 5],
    ['ghostsquad', 3],
    ['darthbdaman', 3],
    ['wim95', 3],
    ['icopp', 2],
    ['mothheart', 2],
    ['yetihairball', 2],
    ['DiglidiDudeNG', 1],
    ['Loganbacca', 1],
    ['RowanSkie', 1],
    ['Nightcaper', 1],
    ['SierraKomodo', 1],
    ['sehraf', 1],
    ['shadowslasher410', 1],
    ['soyasoya5', 1],
    ['thurask', 1],
]);

// Some contributions were made using email addresses that aren't associated
// with a GitHub account by people with other contributions done with an email
// that is associated with a GitHub account. This maps the latter to the former
// so that their stats can be combined.
const contributorMapping = new Map([
    ['Ortham', ['Liam Brown']],
    ['dependabot[bot]', ['dependabot-preview[bot]']],
    ['MothHeart', ['Dr. Gutfuck LLC', 'mothheart']],
    ['David Tan', ['Velgus', 'David']],
]);

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
    contributorsStats.sort(sortContributors);

    const contrib = document.getElementById('contrib');
    contrib.removeChild(contrib.firstElementChild);

    for (const contributor of contributorsStats) {
        addToList(contrib, contributor);
    }
}

function getContributorsStats(contributors) {
    return contributors
        .map(getStats)
        .reduce(statsReducer, []);
}

function fixStats(contributorsStats) {
    // Two fixes need to be made. Some commits are common to the loot and
    // libloot repos: these are double-counted by GitHub and that needs to be
    // reversed. There are also some separate stats objects that actually refer
    // to the same person and so need to be merged.

    const countByContributor = new Map();

    for (const contributorStats of contributorsStats) {
        const contributionCount = duplicateContributions.get(contributorStats.name);
        if (contributionCount !== undefined) {
            console.log(`Removing ${contributionCount} double-counted contributions for ${contributorStats.name}`);
            contributorStats.contributions -= contributionCount;
        }

        countByContributor.set(contributorStats.name, contributorStats.contributions);
    }

    const namesToRemove = new Set();

    for (const contributorStats of contributorsStats) {
        const otherNames = contributorMapping.get(contributorStats.name) ?? [];
        for (const otherName of otherNames) {
            const otherNameCount = countByContributor.get(otherName);
            if (otherNameCount !== undefined) {
                console.log(`Adding contributions by ${otherName} to contributions by ${contributorStats.name}`);
                contributorStats.contributions += otherNameCount;

                namesToRemove.add(otherName);
            }
        }
    }

    return contributorsStats
        .filter(stats => !namesToRemove.has(stats.name));
}

async function getContributors() {
    const octokit = new Octokit();

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

    const fixedStats = fixStats(stats);

    displayContributorsStats(fixedStats);
}

getAndDisplayContributorsStats();
