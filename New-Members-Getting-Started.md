First of all, thanks for volunteering to help develop/maintain BOSS! This page will guide you from having just volunteered all the way through to getting set up and making your first contribution.

### Registering on GitHub

BOSS uses Git repositories on GitHub to help manage the changes made to its files by the BOSS team members, so you'll need a GitHub account. Sign up for one then send the BOSS team admin you initially contacted your GitHub username.

### Installing a Git Client

To work with the Git repositories, you'll also need a Git client. Any client should do, but [GitHub's own client](http://windows.github.com/) is probably the simplest on Windows for those new to Git. This guide will assume that you're using it.

Although not essential, a text editor such as [Notepad++](http://notepad-plus-plus.org/) is highly recommended for working on BOSS's files.

### Setting Up GitHub for Windows

After you install it, GitHub for Windows (GfW) will open for the first time, and ask you to log in to your GitHub account in a dark grey panel. If you click outside the panel, it may disappear, but you can reach it again by clicking the "log in" option on the left side of the GfW window.

Once you've logged in, Click the "tools" icon at the top middle of the GfW window, choose "options", and fill in your GitHub username in the first text box under "configure git" if it isn't already filled in.

### Initialising Repositories

Before you can start working on the BOSS files, you need to 'clone' their repositories. This means exactly what it suggests - you take a complete copy of an online repository and put it on your computer.

On the left side of the GfW window, you'll see an entry for the boss-developers account. Clicking on it will display a list of all the repositories belonging to that account online. To clone a repository, mouse over it in the list and click on the "CLONE" button that gets displayed.

Once the repository has been cloned, you can double-click on its entry in the list to go to the repository 'home page'. You can't make any changes to the files in the repository here, but this page is used to 'commit' changes (ie. save them to your repository), sync your repository to the online one, and view the history of changes, among other things. 

### Making Changes

GfW puts all your local repositories in your `My Documents\GitHub\` folder, so you can either go there using Windows Explorer, or if you already have the repository open in GfW, you can open it directly in Windows Explorer by clicking on the gear icon in the upper right corner of the window and choosing "open in explorer".

Open the file you want to edit (eg. the repository's `masterlist.yaml`) in your favorite text editor and make any changes you want. Once you're done, save the file, and switch back to the GfW window. 

On the left side of the GfW window, above the history list, you'll see it now says "uncommitted changes". Clicking on the "SHOW" button there will display a box in which you can write a short commit message and optionally include some more detailed information. The short message should be a maximum of 50 characters (GfW will grey out any text that goes beyond this limit to let you know). Once you've written the message(s), click the "commit to master" button to save your changes to your local repository.

### Syncing Repositories

Once you've committed your changes to your local repository, it is very important that you then sync your local repository with the online one.

If your local repository is not in sync with the online one, there will be a "sync" button in the upper right corner of the GfW window. Clicking this button will sync the repositories. If the local and online repositories are already in sync, this button is replaced with a tick and the text "in sync".

If you have made commits to your local repository that have not been synced to the online repository, these will be displayed under the heading "unsynced commits" in the list on the left side of the GfW window.

You should also sync your repository before making any changes, to make sure that you are editing the latest revision.

### Further Reading

Before continuing, see the [[Guidelines|Guidelines]] page to familiarise yourself with the recommendations and team policies detailed there. The [[Masterlist Editing|Masterlist-Editing]] page gives more information on how to go about making changes to the masterlists. See the [[Resolving Conflicts|Resolving-Conflicts]] page on how to handle situations where someone else has edited a masterlist at the same time as you and applied their changes first.

For information on the format and syntax of the masterlists, see the [Metadata Syntax](http://boss-developers.github.io/docs/BOSS%20Metadata%20Syntax.html) documentation.

### Getting Help

If you have any problems or questions regarding anything relating to BOSS, feel free to ask current members questions. We can all be contacted by PM - the [[Team Members|Team-Members]] page lists all current members and their usernames on Bethsoft, Nexus and GitHub.

Technical questions are best sent to WrinklyNinja, as he's responsible for BOSS's coding. This includes questions relating to things like how BOSS works, the masterlist syntax, etc.

Metadata questions are best sent to members that contribute to the masterlist you are asking about. This includes questions like "what do you think about making X load after Y?" and "Alice said that C should be loading after D, but C has a load of patches, so won't that break something?".