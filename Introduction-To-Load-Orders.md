This page provides a general overview of load ordering in the games LOOT supports for those who are unfamiliar with the concept. For simplicity, "the game" will be used when the text refers to any of the games that LOOT supports.

Mod plugins for the game are files that end in `.esp` or `.esm`. These files are created by the game's official editing tools, or by third-party modders' tools. They contain various data *records*, which  cover almost all aspects of what is in the game &ndash; NPCs, items, races, interiors, worlds, quests, etc. &ndash; and can either be new or changes to the records added by another plugin.

When the game is run, it loads each installed plugin one by one in a certain *load order*. The load order is important for two reasons:

* If one plugin changes a record added by another plugin, the former must load after the latter. If it doesn't, the game will crash on launch.
* The game can only apply one version of a record, so if multiple plugins contain the same record, the last-loaded plugin's version overrides all others. This is known as the *rule of one*, and it holds true for almost all record types. Some overrides can cause problems in-game, and a good load order is one that arranges plugins to avoid such problems.

There are a few hardcoded rules related to load order:

* Master plugins always load before non-master plugins. The difference between the two plugin types isn't really relevant, except that a plugin's type is decided by a setting inside it, and not by its file extension (even though `.esm` stands for Elder Scrolls Master).
* There is a limit of 255 active plugins that can be loaded by the game. This isn't strictly a load *order* thing, but is worth mentioning.
* In Skyrim, `Skyrim.esm` always loads before all other plugins.
* In Skyrim, if `Update.esm` is present, it is always loaded. It loads after all other master plugins, unless it has another position explicitly set.

A plugin's position in the load order is often displayed by mod managers as a hexadecimal number, from 00 to FE (0 to 255 in decimal). The plugin with position 00 loads first, and the plugin with position FE is loaded last. Hexadecimal numbers are used to display the load order positions of plugins because these numbers form the first two digits of the code that the game uses to reference the records that the plugin adds, so knowing the numbers allows modders and mod users to determine from which plugin a record is from.

In Oblivion, Fallout 3 and Fallout: New Vegas, load order is determined by plugin timestamps, and the plugins you have accessed are listed in `%LOCALAPPDATA%\<game>\plugins.txt`. As such, it's best to use a mod manager to create a backup of your load order. In Skyrim, the load order of active plugins is stored in `%LOCALAPPDATA%\<game>\plugins.txt`, and modding utilities generally use `%LOCALAPPDATA%\<game>\loadorder.txt` to store the load order of all plugins. This makes backing up your load order as easy as making copies of those two files.