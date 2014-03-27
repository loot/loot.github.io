This page will guide anyone wishing to contribute to LOOT directly through the process of getting set up and making their first contribution. You don't need to be a project member to join in!

### Getting Set Up

To get started, you'll need:

* A GitHub account
* A Git client, e.g. [GitHub for Windows](http://windows.github.com/)
* A text editor, e.g. [Notepad++](http://notepad-plus-plus.org/)

This guide will assume you're using GitHub for Windows (GFW).

### Forking a Repository

To contribute changes, you will need to [fork](http://guides.github.com/overviews/forking/) the repository that contains the file(s) you wish to edit. LOOT's repositories are listed [here](https://github.com/loot).

Forking lets you contribute to the project without worrying about making a mistake and breaking something, because your changes are checked by others before they get applied to the original repository.

*Note*: A fork needs to be [kept in sync](https://help.github.com/articles/syncing-a-fork) with its original repository. If you'd rather avoid the command line, you can delete your fork once your pull request has been accepted, then create a new fork when you next want to submit any changes.

### Making Changes

Open the repository that contains the file(s) you want to edit in GFW, then click the gear icon in the upper right corner of the window and select "Open in explorer" to view the repository contents.

Edit the file(s) you want to make changes to using your text editor or appropriate tool of choice, then once you're done, save the file and switch back to GFW. There you can make a commit, sync and create a pull request as described in the forking guide linked to above.

If you're editing a masterlist, see the [[Masterlist Editing|Masterlist-Editing]] page for more information.

### Joining the Team

Contributors can ask or be asked to join the LOOT team, which grants write access to the LOOT repositories, their issue trackers and wikis. Addition of new team members is done by the team admins, who base their decision on the quality of past contributions. If you would like to join the team, and feel comfortable with the workflow, contact a [[team member|Team-Members]].

### Contributing as a Team Member

Team members don't need to fork LOOT repositories, and can instead clone the original repositories and edit their files directly. This introduces a few additional points to ensure team members work well together:

1. Make sure that your local repository is in sync with the online repository before and after you make any changes. This helps to avoid conflicts.
2. It's always best to make commits in your own branch, and merge them into the repository's `master` branch when you're done working. For one-off commits the advantage is not so clear, but if you are making a set of commits with a common theme, a branch will help keep things organised. 
3. If you have committed changes to your local repository, and someone else synced their changes to the online repository after you last synced, then you may need to manually merge the changes. You'll know if you have to do this because GFW will give you an error message when you try to sync, in which case see [[Resolving Conflicts|Resolving-Conflicts]].
4. You should also have a read of the [[Team Policies|Team-Policies]] and [[Team Member Responsibilities|Team-Member-Responsibilities]] pages to familiarise yourself with their contents.

### Getting Help

If you have any problems or questions regarding anything relating to LOOT, feel free to ask team members questions: the [[Team Members|Team-Members]] page lists members' usernames on the Bethesda Softworks Forums, Nexus Forums and GitHub.

Technical questions are best sent to WrinklyNinja, as he's responsible for LOOT's programming. This includes questions relating to things like how LOOT works, the masterlist syntax, etc.

Metadata questions are best sent to members that contribute to the masterlist you are asking about. This includes questions like "what do you think about making X load after Y?" and "Alice said that C should be loading after D, but C has a load of patches, so won't that break something?".