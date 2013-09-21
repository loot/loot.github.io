### Introduction

This wiki page is aimed at anyone managing a BOSS thread, or anyone who finds themselves in the position of being the only person active when a thread reaches its 200 post limit.

### The Opening Post

The opening posts for the BOSS threads are stored in two parts. The generic part is in code blocks below. The game-specific part is stored as `Thead History.txt` in each game's repository. When creating a BOSS thread, first copy/paste the contents of the generic part into the opening post text box, then insert the contents of the game-specific part into the generic part, just between the tag-line and the introduction.

#### The Generic Part

```Markdown
[center][size=6]BOSS[/size]

A load order optimisation tool for games using the Elder Scrolls Plugin/Master system.[/center]


[size=5]Introduction[/size]

BOSS is a plugin load order optimiser for TES IV: Oblivion, TES V: Skyrim, Fallout 3 and Fallout: New Vegas. It is designed to assist mod users in avoiding detrimental conflicts, by automatically calculating a load order that satisfies all plugin dependencies and maximises each plugin's impact on the user's game.

BOSS also provides some load order error checking, including checks for requirements, incompatibilities and cyclic dependencies. In addition, it provides a large number of plugin-specific usage notes, bug wawrnings and Bash Tag suggestions.

Although BOSS is able to calculate the correct load order positions for the vast majority of mods without any user input, some plugins are designed to load at certain positions in a load order, and BOSS may be unable to determine this from the plugins themselves. As such, BOSS provides a mechanism for supplying additional plugin metadata so that it may sort them correctly.

BOSS is intended to make using mods easier, and mod users should still possess a working knowledge of mod load ordering.


[size=5]Downloads[/size]

BOSS can be downloaded from its [url=http://boss-developers.github.io]website[/url].

[size=5]Contributions & Help[/size]

General discussion and the submission of questions, suggestions and metadata takes place in BOSS's official threads for [url=http://forums.bethsoft.com/?showtopic=1404766]Oblivion[/url], [url=http://forums.bethsoft.com/?showtopic=1406341]Skyrim[/url], [url=http://forums.bethsoft.com/?showtopic=1282711]Fallout 3[/url] and [url=http://forums.bethsoft.com/?showtopic=1313081]Fallout: New Vegas[/url].

User contribution of additions and corrections to BOSS's masterlists are vital to the upkeep of BOSS. Please let us know what you know!

Lists of dirty plugins are also very welcome, but for the report to be most useful we require:

[list]
[*] The ESP/ESM file name(s).
[*] The number of records removed (the ITM count) as shown by TES4Edit/FO3Edit/FNVEdit/TES5Edit (not the number of records processed).
[*] The number of records undeleted (the UDR count) as shown by TES4Edit/FO3Edit/FNVEdit/TES5Edit (not the number of records processed).
[*] The CRC(s) of the unlcean ESP/ESM file name(s). Make sure that the CRCs are of the uncleaned files, not the files after cleaning. The CRC(s) may be calculated using BOSS, Wrye *ash or 7-zip, with other sources being unverified as correct. In the case of 7-zip, the "CRC checksum for data" is the one required.
[/list]


[i]See the ReadMe in the download for more information.[/i]
```

### Updating the Thread History

The thread history is useful and so should be kept up to date whenever a thread is closed and a new one is opened. Be sure to check that the last thread it lists matches up with the last thread given in the opening post of the current BOSS thread. You can get the topic ID of a thread from its URL. The syntax is fairly obvious.