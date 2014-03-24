This page will guide anyone wishing to contribute to LOOT directly through the process of getting set up and making their first contribution. You don't need to be a project member to join in!

### Getting Set Up

LOOT uses Git repositories on GitHub to help manage the changes made to its files, so you'll need a GitHub account, and a Git client. Any client should do, but [GitHub's own client](http://windows.github.com/) is probably the simplest on Windows for those new to Git. This guide will assume that you're using it (and abbreviate its name as GfW).

A text editor such as [Notepad++](http://notepad-plus-plus.org/) is highly recommended for working on LOOT's files.

### Forking a Repository

If you're not a member of the LOOT team, you won't be able to make changes to the official code repositories directly. Instead, you can take advantage of GitHub's Forking system, which is briefly described [here](http://guides.github.com/overviews/forking/).

Once your pull request has been accepted and merged into the official repository you forked, we'd recommend deleting your fork. Then, if you want to submit any more changes in the future, just create a new fork. This avoids having to keep your fork [up to date](https://help.github.com/articles/syncing-a-fork).

Forking is a great way to get to know the project and contribute to it without worrying about making a mistake and breaking something, because someone always has to check your changes before they get included into the official repositories. Make good pull requests and you'll probably be asked to join the team!

### Making Changes

What the above forking guide doesn't explain is where the files to edit are put on your computer. GfW puts all your local repositories in your `My Documents\GitHub\` folder, so you can either go there using Windows Explorer, or if you already have the repository open in GfW, you can open it directly in Windows Explorer by clicking on the gear icon in the upper right corner of the window and choosing "open in explorer".

Open the file you want to edit (eg. the repository's `masterlist.yaml`) in your favorite text editor and make any changes you want. Once you're done, save the file, and switch back to the GfW window. Then you can make a commit, sync and create a pull request as described in the guide.

If you're editing a masterlist, see the [[Masterlist Editing|Masterlist-Editing]] page for information on how to go about making changes to the masterlists. The [Metadata Syntax documentation](http://loot.github.io/docs/dev/LOOT%20Metadata%20Syntax.html) details the actual format and syntax used by the masterlists.

### Contributing as a Team Member

As a team member, contributing becomes a little different to the above - instead of forking a repository and cloning your fork, you can clone the official repository and make changes to it directly. The process is much the same, but because there are other people who also make changes to the same repository, it becomes a little bit more complicated.

1. It is vitally important that you make sure that your local repository is in sync with the online repository before and after you make any changes.
2. If you're not sure about some changes you're making, or they need to be made in several commits before they're finished, make them in a separate branch, and merge them in when you're finished and you're sure that the changes don't break anything.
3. If you have committed changes to your local repository, and someone else synced their changes to the online repository after you last synced, then you may need to manually merge the changes. You'll know if you have to do this because GfW will give you an error message when you try to sync, in which case see [[Resolving Conflicts|Resolving-Conflicts]].
4. You should also have a read of the [[Guidelines|Guidelines]] page to familiarise yourself with the recommendations and team policies detailed there.

### Getting Help

If you have any problems or questions regarding anything relating to LOOT, feel free to ask current members questions. We can all be contacted by PM - the [[Team Members|Team-Members]] page lists all current members and their usernames on Bethsoft, Nexus and GitHub.

Technical questions are best sent to WrinklyNinja, as he's responsible for LOOT's coding. This includes questions relating to things like how LOOT works, the masterlist syntax, etc.

Metadata questions are best sent to members that contribute to the masterlist you are asking about. This includes questions like "what do you think about making X load after Y?" and "Alice said that C should be loading after D, but C has a load of patches, so won't that break something?".