### Contents

#### General Information

1. [What happened to BOSS v3?](#what-happened-to-boss-v3)
2. [Do I have to switch from BOSS to LOOT?](#do-i-have-to-switch-from-boss-to-loot)
3. [Is there anything I should bear in mind when switching to LOOT?](#is-there-anything-i-should-bear-in-mind-when-switching-to-loot)
4. [I have a SkyProc patcher that runs BOSS. How do I get it to run LOOT instead?](#i-have-a-skyproc-patcher-that-runs-boss-how-do-i-get-it-to-run-loot-instead)
5. [How can LOOT not have unrecognised plugins?](#how-can-loot-not-have-unrecognised-plugins)
6. [Does LOOT sort based only on plugin content?](#does-loot-sort-based-only-on-plugin-content)
7. [How can the load order LOOT gives be right if BOSS gives a very different load order?](#how-can-the-load-order-loot-gives-be-right-if-boss-gives-a-very-different-load-order)
8. [I'm still suspicious that LOOT is ordering plugin X after plugin Y. How do I double-check the ordering?](#im-still-suspicious-that-loot-is-ordering-plugin-x-after-plugin-y-how-do-i-double-check-the-ordering)

#### Using LOOT

9. [OK, but I still have specific reasons to have in my game a different load order than the one LOOT proposes. What do I do?](#ok-but-i-still-have-specific-reasons-to-have-in-my-game-a-different-load-order-than-the-one-loot-proposes-what-do-i-do)
10. [I've run LOOT with obsolete versions of some plugins and LOOT didn't tell me to update them! How come?](#ive-run-loot-with-obsolete-versions-of-some-plugins-and-loot-didnt-tell-me-to-update-them-how-come)

#### Common Issues

11. [I'm getting Git errors when LOOT tries to update its masterlist. How do I fix this?](#im-getting-git-errors-when-loot-tries-to-update-its-masterlist-how-do-i-fix-this)
13. [LOOT ran without any errors, but the load order hasn't changed to match what LOOT has in its report. Why?](#loot-ran-without-any-errors-but-the-load-order-hasnt-changed-to-match-what-loot-has-in-its-report-why)
14. [LOOT's report is blank. How do I fix this?](#loots-report-is-blank-how-do-i-fix-this)
15. [LOOT's window is blank when I'm starting it through Mod Organizer. What's up?](#loots-window-is-blank-when-im-starting-it-through-mod-organizer-whats-up)
16. [I'm seeing empty box characters in the metadata editor window's plugins list. What are these?](#im-seeing-empty-box-characters-in-the-metadata-editor-windows-plugins-list-what-are-these)
17. [LOOT shows the wrong or no version number for some plugins. Why?](#loot-shows-the-wrong-or-no-version-number-for-some-plugins-why)
18. [A game is installed, but LOOT cannot detect it. How do I fix this?](#a-game-is-installed-but-loot-cannot-detect-it-how-do-i-fix-this)
19. [When LOOT updates the load order, it removes line breaks from `plugins.txt` and `loadorder.txt`. Won't this break something?](#when-loot-updates-the-load-order-it-removes-line-breaks-from-pluginstxt-and-loadordertxt-wont-this-break-something)
20. [Some of LOOT's user interface is cut off by the edge of its window. Why?](#some-of-loots-user-interface-is-cut-off-by-the-edge-of-its-window-why)

### Questions

---

#### General Information

##### What happened to BOSS v3?

LOOT is BOSS v3. It got turned into a separate utility because concerns were raised about the major changes in expected functionality between v2 and v3.

##### Do I have to switch from BOSS to LOOT?

No. However, most of BOSS's current contributors are now more interested in contributing to LOOT, so BOSS will likely lag further behind in getting unrecognised plugins recognised as time goes on. One of the many improvements in LOOT is that it has no unrecognised plugins.

##### Is there anything I should bear in mind when switching to LOOT?

It's worth double-checking the load order LOOT gives you, in case it's gotten something wrong. Also, if you're not starting a new game, changing your load order may cause in-game issues. To avoid disaster, you can backup your load order as follows:

1. Make a backup of your current `.ess` save file, and its accompanying `.skse` file (if you have SKSE installed). These are found in the `%USERPROFILE%\Documents\My Games\Skyrim\Saves` folder.
2. Make a backup of your load order files, `plugins.txt` and `loadorder.txt`, which are found in the `%LOCALAPPDATA%\Skyrim` folder.

That way, if something does go wrong, you have backups to roll back to. If you don't overwrite or delete save files, you don't need to back them up, so long as you can remember which save was made before you made the changes that caused problems.

##### I have a SkyProc patcher that runs BOSS. How do I get it to run LOOT instead?

LOOT support may be added to SkyProc patchers in time. Until then, you can do the following:

1. Run LOOT.
2. Run your SkyProc patcher(s) with the `-NOBOSS` argument.
3. Have fun.

##### How can LOOT not have unrecognised plugins?

To sort a plugin, BOSS needs it to be added to its masterlist, which is hand-ordered by its maintainers. LOOT instead reads the contents of each plugin to see which plugins conflict, etc. and uses that information to decide on the best ordering. This means that it can sort all plugins without needing them to become recognised first.

##### Does LOOT sort based only on plugin content?

No. While it can sort most plugins correctly, sometimes it gets things wrong, and LOOT's masterlist is used to provide metadata so that it can sort such plugins correctly. Unlike in BOSS, LOOT's masterlist doesn't give specific load order positions, which makes it more adaptable and easier to maintain.

##### How can the load order LOOT gives be right if BOSS gives a very different load order?

There can be more than one correct load order for a given set of plugins. For example, some plugins may not conflict or depend on each other, so their relative orders wouldn't matter. The load order BOSS gives is hand-made to look 'neat' as well as work, so plugins from the same mod will usually get grouped together, but LOOT doesn't know which plugins belong to which mod, so it just puts them where it thinks they work.

##### I'm still suspicious that LOOT is ordering plugin X after plugin Y. How do I double-check the ordering?

The most thorough method is to look for conflicts in TES5Edit and decide for yourself if the load order LOOT gives resolves them to your liking. Alternatively, selecting a plugin in LOOT before applying a sorted load order and ticking the "Show only conflicting plugins" checkbox will let you see if the two plugins conflict at all (though it will also show plugins with BSAs if the selected plugin loads a BSA).

---

#### Using LOOT

##### OK, but I still have specific reasons to have in *my* game a different load order than the one LOOT proposes. What do I do?

Users can supply metadata themselves to alter the order LOOT gives. It's not as precise as the user rules feature offered by BOSS, due to the nature of LOOT's ordering system, but there are two types of metadata that can be supplied to change load order:

* 'Load After' entries can be used for pairs of specific plugins.
* Priority values can be used when the plugin needs to load before or after many other plugins.

Be sure to read LOOT's readme for more information on these.

##### I've run LOOT with obsolete versions of some plugins and LOOT didn't tell me to update them! How come?

LOOT isn't omniscient. It may provide warnings for outdated plugins through the masterlist, but this depends on user feedback. LOOT has no way of being able to tell by itself if a plugin is outdated or not.

---

#### Common Issues

##### I'm getting Git errors when LOOT tries to update its masterlist. How do I fix this?

Try deleting the `.git` folder in `%LOCALAPPDATA%\LOOT\<game folder>\`. If that doesn't work, make sure any firewalls or security software you have installed aren't stopping LOOT from reaching the online masterlist.

Alternatively, your WinSock configuration may be corrupt: this can be fixed using the instructions [here](https://support.microsoft.com/kb/817571) and [here](https://support.microsoft.com/kb/318584), or there's a fix-it utility [here](http://h10025.www1.hp.com/ewfrf/wc/document?cc=uk&lc=en&docname=c01184567).

If LOOT still can't update its masterlist, you can update manually by downloading [this file](https://raw.githubusercontent.com/loot/skyrim/master/masterlist.yaml) and placing it in the `%LOCALAPPDATA%\LOOT\Skyrim` folder. Replace Skyrim with `oblivion`, `fallout3` or `falloutnv` as necessary, in the URL and the folder path.

##### LOOT ran without any errors, but the load order hasn't changed to match what LOOT has in its report. Why?

If you're sorting for Skyrim, make sure that you haven't replaced or renamed your `TESV.exe`, as this interferes with LOOT's ability to decide how to set the load order.

##### LOOT's report is blank. How do I fix this?

LOOT uses Windows' internal web browser to display its report. This web browser is basically Internet Explorer, but it's present even if you have Internet Explorer disabled. If it's not displaying LOOT's report properly, this may be because it isn't up-to-date.

The report display has been tested using IE 11, which is available to all Windows 7 and 8.x users. Windows Vista users can only update as far as IE 10, and though the report should display with this version, it is untested.

To update the internal web browser, make sure Internet Explorer is enabled in the "Turn Windows features on/off" control panel, and install the latest updates available through Windows update. That should be enough to fix the report display, and you can disable Internet Explorer again if you so wish.

If you're still not seeing the report fill with content, IE may be blocking Javascript from running on the page. Open "Internet Options" and make sure that the "Allow active content to run in files on My Computer" option is enabled. If that doesn't fix it, try replacing the `resources/report/script.js` file in your LOOT folder with [this one](https://raw.githubusercontent.com/loot/loot/master/resources/report/script.js).

##### LOOT's window is blank when I'm starting it through Mod Organizer. What's up?

Mod Organizer 1.2.10 has a bug preventing LOOT 0.7.0 from working properly. This has been fixed in Mod Organizer 1.2.11, and later versions.

There is also another issue that occasionally causes LOOT's window to be blank when started through Mod Organiser - this can be avoided by adding the `--single-process` argument to Mod Organiser's LOOT launching settings.

##### I'm seeing empty box characters in the metadata editor window's plugins list. What are these?

They are supposed to be ticks and crosses, but there's a bug in Windows that means they don't always get displayed correctly. [This page](https://superuser.com/questions/371282/my-windows-7-has-suddenly-stopped-displaying-unicode-symbols) describes some possible workarounds for the issue.

##### LOOT shows the wrong or no version number for some plugins. Why?

As version numbers are supplied by mod authors in a wide range of formats and LOOT has to detect as many as possible, it occasionally identifies parts of some descriptions as version numbers incorrectly. Authors can also forget to update their plugins' version numbers. When in doubt, check the version number given in a mod's readme.

##### A game is installed, but LOOT cannot detect it. How do I fix this?

Steam likes to remove the game's Registry entry when the game is updated or its cache is verified. Run the game's launcher to add the Registry entry back again. LOOT will then be able to detect the game.

##### When LOOT updates the load order, it removes line breaks from `plugins.txt` and `loadorder.txt`. Won't this break something?

LOOT has probably just replaced the `CR LF` line breaks with `LF` line breaks. It doesn't make any difference to the game.

##### Some of LOOT's user interface is cut off by the edge of its window. Why?

This is probably due to your display scaling settings, and may also affect other applications. Try setting your scaling to 100% to avoid the issue.
