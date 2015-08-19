This is where GitHub Desktop falls short - to resolve conflicts, you're probably going to have to use the command line shell at some point. [This page](http://git-scm.com/book/en/Distributed-Git-Contributing-to-a-Project#Private-Small-Team) discusses the issue well, but is aimed at people who don't use a GUI client at all. It's still worth a read to get an understanding of the issues, and its diagrams are very good.

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

You could decide to keep both lines one after another, in which case you would edit the file so that it becomes:

```markdown
This file is to be used to demonstrate conflict resolution.

This line has been added by somebody else.
This line has been added by you.

This is the last line of the file.
```

Now you are ready to do the `git add <file>` step.