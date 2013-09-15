First of all, thanks for volunteering to help develop/maintain BOSS! This page will guide you from having just volunteered all the way through to getting set up and making your first contribution.

### Registering on GitHub

BOSS uses Git repositories on GitHub to help manage the changes made to its files by the BOSS team members, so you'll need a GitHub account. Sign up for one then send the BOSS team admin you initially contacted your GitHub username. Also tell them what you want to work on since the code, the site and each of the games' masterlists all have separate repositories with different access permissions.

### Installing a Git Client

To work with the Git repositories, you'll also need a Git client. Any client should do, but [GitHub's own client](http://windows.github.com/) is probably the simplest on Windows for those new to Git. This guide will assume that you're using it.

Although not essential, a text editor such as [Notepad++](http://notepad-plus-plus.org/) is highly recommended for working on BOSS's files.

### Setting Up GitHub for Windows

After you install it, GitHub for Windows (GfW) will open for the first time, and ask you to log in to your GitHub account in a dark grey panel. If you click outside the panel, it may disappear, but you can reach it again by clicking the "LOG IN" text in the upper right corner of the GfW window.

Once you've logged in, Click the "tools" icon at the top middle of the GfW window, choose "options", and fill in your GitHub username in the first text box under "configure git" if it isn't already filled in.

### Initialising Repositories

Before you can start working on the BOSS files, you need to 'clone' their repositories. This means exactly what it suggests - you take a complete copy of an online repository and put it on your computer.

In the GfW window, you'll see an entry for the boss-developers account on the left side of the screen. Clicking on it will display a list of all the repositories belonging to that account online. To clone a repository, mouse over it in the list and click on the "CLONE" button that gets displayed.

Once the repository has been cloned, you can click on the blue arrow in its entry in the list to go to the repository 'home page'. You can't make any changes to the files in the repository here, but this page is used to 'commit' changes (ie. save them to your repository), sync your repository to the online one, and view the history of changes, among other things. 

### Making Changes

GfW puts all your local repositories in your `My Documents\GitHub\` folder, so you can either go there using Windows Explorer, or if you already have the repository open in GfW, you can choose "tools->open in explorer".

Open the file you want to edit (eg. the repository's `masterlist.yaml`) in your favorite text editor and make any changes you want. Once you're done, save the file, and switch back to the GfW window. 

On the right side of the GfW window, above the history list, you'll see it now says "uncommitted changes" in blue. Clicking on the "SHOW" button there will display a yellow box in which you can write a short commit message and optionally include some more detailed information. The short message should be a maximum of 50 characters (GfW will grey out any text that goes beyond this limit to let you know). Once you've written the message(s), click the "COMMIT" button to save your changes to your local repository.

### Syncing Repositories

Once you've committed your changes to your local repository, it is very important that you then sync your local repository with the online one. This is done by clicking the "sync" button in the upper middle of the GfW window.

You should also sync your repository before making any changes, to make sure that you are editing the latest revision.

### Resolving Conflicts

This is where GitHub for Windows falls short - to resolve conflicts, you're probably going to have to use the command line shell at some point. [This page](http://git-scm.com/book/en/Distributed-Git-Contributing-to-a-Project#Private-Small-Team) discusses the issue well, but is aimed at people who don't use a GUI client at all. It's still worth a read to get an understanding of the issues, and its diagrams are very good.

Below is some guidance for resolving conflicts using GfW and the shell where necessary.

#### Merging Conflicts In The Same File

If the online repository is ahead of your local repository when you try to sync, you'll get an error message ("failed to sync this branch due to unmerged files") and the option to open the shell. Select it, and a command line window will be displayed.

First of all, enter `git status`. This will show you the current status of your local repository. Since you're trying to fix the sync error, you'll see some info about how you're currently 'rebasing' the 'master' branch. The "unmerged paths" list will show you the file(s) that need to be merged manually.

Open the file(s) that need to be merged in your favorite text editor. You will see that it's a mix of your revision and the latest online revision, with lines starting with `>>>>>>>`, `=======` and `<<<<<<<` separating them. The example after the second paragraph [here](http://git-scm.com/docs/git-merge#_how_conflicts_are_presented) may make their meaning clearer, but basically the `=======` separates the local and online versions of some text, the stuff between `=======` and `>>>>>>>` is your version of some text, and the stuff between `=======` and `<<<<<<<` is the online version of some text.

Edit the file, picking and choosing the bits that should stay (you may need to combine them or move them around if a lot of changes were made), and once you're done save your changes. There should now be no lines beginning `>>>>>>>`, `=======` or `<<<<<<<` left.

In the shell, enter `git add <file>` to mark the file you manually merged as resolved. Once all the unmerged paths have been resolved, enter `git rebase --continue` to finish the merge. You can now close the shell window.

Back in the GfW window, click the "sync" button to update the online repository with your merged revision. You're done!

##### An Example

You sync your local repository to the online repository, and open a file containing the following:

```markdown
This file is to be used to demonstrate conflict resolution.

This is the last line of the file.
```

You then edit it, so that it becomes:

```markdown
This file is to be used to demonstrate conflict resolution.

This line has been added by you.

This is the last line of the file.
```

In the meantime, someone else also edits the same file, and syncs their changes with the online repository, so its copy of the file becomes:

```markdown
This file is to be used to demonstrate conflict resolution.

This line has been added by somebody else.

This is the last line of the file.
```

When you open the file for manual merging, it will have changed to:

```markdown
This file is to be used to demonstrate conflict resolution.

<<<<<<<
This line has been added by somebody else.
=======
This line has been added by you.
>>>>>>>

This is the last line of the file.
```

You could decide to keep both lines one after another, in which you would edit the file so that it becomes:

```markdown
This file is to be used to demonstrate conflict resolution.

This line has been added by somebody else.
This line has been added by you.

This is the last line of the file.
```

Now you are ready to do the `git add <file>` step.

### Further Reading

Before continuing, see the [[Guidelines|Guidelines]] page to familiarise yourself with the recommendations and team policies detailed there.

For information on the format and syntax of the masterlists, see `docs/BOSS Metadata Syntax.html` in the [boss-code](https://github.com/boss-developers/boss-code) repository.

### Getting Help

If you have any problems or questions regarding anything relating to BOSS, feel free to ask current members questions. We can all be contacted by PM - the [[Team Members|Team-Members]] page lists all current members and their usernames on Bethsoft, Nexus and GitHub.

Technical questions are best sent to WrinklyNinja, as he's responsible for BOSS's coding. This includes questions relating to things like how BOSS works, the masterlist syntax, etc.

Metadata questions are best sent to members that contribute to the masterlist you are asking about. This includes questions like "what do you think about making X load after Y?" and "Alice said that C should be loading after D, but C has a load of patches, so won't that break something?".