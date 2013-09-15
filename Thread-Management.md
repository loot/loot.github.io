### Introduction

This wiki page is aimed at anyone managing a BOSS thread, or anyone who finds themselves in the position of being the only person active when a thread reaches its 200 post limit.

### The Opening Post

The opening posts for the BOSS threads are stored in two parts. The generic part is in code blocks below. The game-specific part is stored as `Thead History.txt` in each game's repository. When creating a BOSS thread, first copy/paste the contents of the generic part into the opening post text box, then insert the contents of the game-specific part into the generic part, just between the tag-line and the introduction.

#### The Generic Part

```
[center][size=6]BOSS[/size]

A plugin load order optimiser for TES III: Morrowind, TES IV: Oblivion, Nehrim - At Fate's Edge, TES V: Skyrim, Fallout 3 and Fallout: New Vegas.[/center]


[size=5]Introduction[/size]

BOSS is designed to assist mod users in avoiding detrimental conflicts, by setting the correct load order for the plugins they have installed.

BOSS also provides thousands of plugin-specific messages, including usage notes, Bash Tag suggestions, requirements, incompatibilities, bug warnings and installation mistake notifications. It supports the sorting of plugins ghosted by the Wrye *ash (Wrye Bash, Wrye Flash, Wrye Flash NV, Wrye Smash) utilities, is highly customisable, has been translated into multiple languages, and is simple to use.

Although BOSS recognises tens of thousands of plugins, it is not a complete solution to load ordering issues, as there are many more mods available. To properly place unrecognised plugins, a good working knowledge of mod load ordering is still necessary, for which some research and documentation reading will go a long way. See the Introduction To Load Orders section of BOSS's readme for an overview.

[b]While BOSS technically supports TES III: Morrowind, no mod plugins are recognised and no further support is planned.[/b] Morrowind users looking for an automated load order manager should consider using [url=http://code.google.com/p/mlox]mlox[/url] instead.

BOSS also has an API that gives programmers access to almost all of BOSS's functionality, plus more general load order management functionality that greatly simplifies working with load orders across the supported games. See the BOSS API Readme for more information on that.


[size=5]Downloads[/size]

BOSS can be downloaded from its [url=http://code.google.com/p/better-oblivion-sorting-software/downloads/list]Google Code page[/url].

[size=5]Contributions & Help[/size]

General discussion, and the submission of questions, suggestions and unrecognised or unclean mods, takes place in BOSS's official threads for [url=http://forums.bethsoft.com/?showtopic=1404766]Oblivion[/url], [url=http://forums.bethsoft.com/?showtopic=1132338]Nehrim[/url], [url=http://forums.bethsoft.com/?showtopic=1406341]Skyrim[/url], [url=http://forums.bethsoft.com/?showtopic=1282711]Fallout 3[/url] and [url=http://forums.bethsoft.com/?showtopic=1313081]Fallout: New Vegas[/url].

User contribution of additions and corrections to the masterlist are vital to the upkeep of BOSS. Let us know what you know.

Lists of unrecognized mods are welcome but the only way we can include them in the database in a timely way is if we get:

[list]
[*] The ESP/ESM file name(s).
[*] A link to where the description, download or readme can be found to read or download.
[*] A brief description of each mod will also help. Feel free to make load order suggestions.
[/list]
Lists of unclean mods are also very welcome, but for the report to be most useful we require:

[list]
[*] The ESP/ESM file name(s).
[*] The number of records removed (the ITM count) as shown by TES4Edit/FO3Edit/FNVEdit/TES5Edit (not the number of records processed).
[*] The number of records undeleted (the UDR count) as shown by TES4Edit/FO3Edit/FNVEdit/TES5Edit (not the number of records processed).
[*] The CRC(s) of the unlcean ESP/ESM file name(s). Make sure that the CRCs are of the uncleaned files, not the files after cleaning. The CRC(s) may be calculated using BOSS, Wrye *ash or 7-zip, with other sources being unverified as correct. In the case of 7-zip, the "CRC checksum for data" is the one required.
[/list]


[size=5]License[/size]

BOSS is distributed under the [url=http://www.gnu.org/licenses/gpl.html]GNU General Public License v3.0[/url], aside from the documentation, which is distributed under the [url=http://www.gnu.org/licenses/fdl.html]GNU Free Documentation License v1.3[/url]. For the full text of both licenses, see the included "Licenses.txt" file.

While the GPL license allows anyone to make derivative works of BOSS, the BOSS Development Team encourages those thinking of doing so to first discuss their reasoning for such an endevour with the Team. It may be that what the derivative work would do differently from BOSS itself is already planned for a future version of BOSS or would be happily integrated into BOSS by the Team, thus avoiding any extra effort by others.

The BOSS Team also appeals to the community to avoid the distribution and development of alternative masterlists, as this would only hamper the community effort to create one universally-optimised load order for all plugins available for download. Any issues with a masterlist are best brought to the attention of the BOSS Team so that we may remedy them ourselves.


[i]See the ReadMe in the download for more information.[/i]
```

### Updating the Thread History

The thread history is useful and so should be kept up to date whenever a thread is closed and a new one is opened. Be sure to check that the last thread it lists matches up with the last thread given in the opening post of the current BOSS thread. You can get the topic ID of a thread from its URL. The syntax is fairly obvious.