The purpose of this page is to explain how symbolic links can be set up to easily test changes made in your local masterlist repository. (Written for a windows system)


### The Process

1. Run BOSS once for the game you intend to create a symbolic link for. This ensures the required directories are created.
2. Turn off `Update masterlist before sorting` in the settings of BOSS and then close the program. If you leave this setting on and run BOSS after creating a symbolic link BOSS will overwrite any changes you make locally.
3. Find the directory BOSS uses. This can be reached by entering `%localappdata%/BOSS` into the start menu's search box.
4. Go into the game's folder and `shift+rightclick` on `masterlist.yaml`. Choose to `copy as path` and then delete the file. We're going to create a symbolic link in place of this file and windows won't let us do that if it's still present.
5. Start the command line in administrator mode (required to create symbolic links). The quickest way to do this is to enter `cmd` into the start menu search box and then hit `ctrl+shift+enter`.
6. In the command window enter `mklink <link path> <target path>`. `link path` is going to be the absolute path we copied earlier. You can paste this in place by right clicking the command window. `target path` is going to be the absolute path to `masterlist.yaml` in your local github repository - you should know where this is.
7. Repeat for each game you intend to work with.

### Things to Know

* To update the masterlist for BOSS in normal use you will need to sync your local repository with github. (BOSS can still do it, but I believe it would cause complications when using git).
* The BOSS report will not be able to give you the SHA for the masterlist it processed. It will always be the one in your local repository though so this isn't an issue.