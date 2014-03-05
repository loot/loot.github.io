You can easily test your masterlist changes *before* syncing them to the online repository, by using one of two methods. Each has advantages and disadvantages, so pick whichever is most suitable for your workflow.

Because both methods make LOOT use your local repository rather than the online one, you'll have to keep your local repository synced with the online one separately - LOOT won't update it for you.

### Using LOOT's "Masterlist Repository URL" Setting

Advantages:
* No messing around with the command line.
* Displays the masterlist revision in the LOOT report correctly.

Disadvantages:
* Requires commits to be made *before* testing, so any fixes for issues found will require additional commits (a trivial disadvantage, really, but still).

#### Method

1. Run LOOT, and open its settings window.
2. Select the game whose masterlist you want to test, and click "Edit Game...".
3. In the Masterlist Repository URL setting's text box, enter the path to your local repository. Eg. if you have the Skyrim masterlist repository at `C:\foo\bar\skyrim`, then put that in the box.
4. Apply the settings, then close and relaunch LOOT. LOOT will now update using your local repository instead of the online one.

### Using Symbolic Links

Advantages:
* Can test changes at any time, without having to make commits first.

Disadvantages:
* Requires some command line action.
* LOOT won't be able to tell you what masterlist revision you're using.

#### The Process

1. Run LOOT once for the game you intend to create a symbolic link for. This ensures the required directories are created.
2. Turn off `Update masterlist before sorting` in the settings of LOOT and then close the program. If you leave this setting on any changes you make in your local repository will be overwritten by LOOT.
3. Find the directory LOOT uses. This can be reached by entering `%localappdata%/LOOT` into the start menu's search box.
4. Go into the game's folder and `shift+rightclick` on `masterlist.yaml`. Choose to `copy as path` and then delete the file. We're going to create a symbolic link in place of this file and windows won't let us do that if it's still present.
5. Start the command line in administrator mode (required to create symbolic links). The quickest way to do this is to enter `cmd` into the start menu search box and then hit `ctrl+shift+enter`.
6. In the command window enter `mklink <link path> <target path>`. `<link path>` is going to be the absolute path we copied earlier. You can paste this in place by right clicking the command window. `<target path>` is going to be the absolute path to `masterlist.yaml` in your local github repository - you should know where this is.
7. Repeat for each game you intend to work with.