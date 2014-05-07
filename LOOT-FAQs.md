A collection of hopefully helpful FAQs and their answers.

---

**Q.** What happened to BOSS v3?

**A.** LOOT is BOSS v3. It got turned into a separate utility because concerns were raised about the major changes in expected functionality between v2 and v3.

---

**Q.** Do I have to switch from BOSS to LOOT?

**A.** No. However, most of BOSS's current contributors are now more interested in contributing to LOOT, so BOSS will likely lag further behind in getting unrecognised plugins recognised as time goes on. One of the many improvements in LOOT is that it has no unrecognised plugins.

---

**Q.** Is there anything I should bear in mind when switching to LOOT?

**A.** It's worth double-checking the load order LOOT gives you, in case it's gotten something wrong. Also, if you're not starting a new game, changing your load order may cause in-game issues. To avoid disaster, you can backup your load order as follows:

1. Make a backup of your current `.ess` save file, and its accompanying `.skse` file (if you have SKSE installed). These are found in the `%USERPROFILE%\Documents\My Games\Skyrim\Saves` folder.
2. Make a backup of your load order files, `plugins.txt` and `loadorder.txt`, which are found in the `%LOCALAPPDATA%\Skyrim` folder.

That way, if something does go wrong, you have backups to roll back to. If you don't overwrite or delete save files, you don't need to back them up, so long as you can remember which save was made before you made the changes that caused problems.

---

**Q.** I have a SkyProc patcher that runs BOSS. How do I get it to run LOOT instead?

**A.** LOOT support may be added to SkyProc patchers in time. Until then, you can do the following:

1. Run LOOT.
2. Run your SkyProc patcher(s) with the `-NOBOSS` argument.
3. Have fun.

---

**Q.** How can LOOT not have unrecognised plugins?

**A.** To sort a plugin, BOSS needs it to be added to its masterlist, which is hand-ordered by its maintainers. LOOT instead reads the contents of each plugin to see which plugins conflict, etc. and uses that information to decide on the best ordering. This means that it can sort all plugins without needing them to become recognised first.

---

**Q.** Does LOOT sort based only on plugin content?

**A.** No. While it can sort most plugins correctly, sometimes it gets things wrong, and LOOT's masterlist is used to provide metadata so that it can sort such plugins correctly. Unlike in BOSS, LOOT's masterlist doesn't give specific load order positions, which makes it more adaptable and easier to maintain.

---

**Q.** How can the load order LOOT gives be right if BOSS gives a very different load order?

**A.** There can be more than one correct load order for a given set of plugins. For example, some plugins may not conflict or depend on each other, so their relative orders wouldn't matter. The load order BOSS gives is hand-made to look 'neat' as well as work, so plugins from the same mod will usually get grouped together, but LOOT doesn't know which plugins belong to which mod, so it just puts them where it thinks they work.

---

**Q.** I'm still suspicious that LOOT is ordering plugin X after plugin Y. How do I double-check the ordering?

**A.** The most thorough method is to look for conflicts in TES5Edit and decide for yourself if the load order LOOT gives resolves them to your liking. Alternatively, selecting a plugin in LOOT before applying a sorted load order and ticking the "Show only conflicting plugins" checkbox will let you see if the two plugins conflict at all (though it will also show plugins with BSAs if the selected plugin loads a BSA).

---

**Q.** OK, but I still have specific reasons to have in *my* game a different load order than the one LOOT proposes. What do I do?

**A.** Users can supply metadata themselves to alter the order LOOT gives. It's not as precise as the user rules feature offered by BOSS, due to the nature of LOOT's ordering system, but there are two types of metadata that can be supplied to change load order:

* 'Load After' entries can be used for pairs of specific plugins.
* Priority values can be used when the plugin needs to load before or after many other plugins.

Be sure to read LOOT's readme for more information on these. 

---

**Q.** I've run LOOT with obsolete versions of some plugins and LOOT didn't tell me to update them! How come?

**A.** LOOT isn't omniscient. It may provide warnings for outdated plugins through the masterlist, but this depends on user feedback. LOOT has no way of being able to tell by itself if a plugin is outdated or not.

---

**Q.** I'm having Internet problems and LOOT can't seem to update its masterlist. Is there a manual workaround?

**A.** Yes. Download [this file](https://raw.githubusercontent.com/loot/skyrim/master/masterlist.yaml) and place it in the `%LOCALAPPDATA%\LOOT\Skyrim` folder. Replace Skyrim with `oblivion`, `fallout3` or `falloutnv` as necessary, in the URL and the folder path.