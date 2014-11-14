Global priorities are used to sort plugins on a "global" scale. LOOT will normally only sort plugins that conflict with each other, but setting a "global `priority`" will allow some plugins to load earlier or later than others, even if they don't conflict. This can be useful to make sure that e.g. unofficial patch plugins are loaded earlier than all other non-official plugins. Details about how they work in practice can be seen in [the Metadata Syntax document](https://loot.github.io/docs/dev/LOOT%20Metadata%20Syntax.html#structs-plugin): see the description for the "priority" field under "Plugin Data Structure".

Below are the global priorities as they are grouped for the games currently supported by LOOT:
- [Skyrim](#skyrim)
- [Oblivion](#oblivion)
- [Fallout: New Vegas](#fallout-new-vegas)
- [Fallout 3](#fallout-3)

# Skyrim

```
-1999000 = -999000 Skyrim.esm, Update.esm
-1980000 = -980000 DLC, Unofficial Patches, SPO
-1960000 = -960000 Falskar, Wyrmstooth
-1950000 = -950000
-1940000 = -940000
-1930000 = -930000
-1920000 = -920000
-1910000 = -910000
-1900000 = -900000
-1890000 = -890000
0
1910000 = 991000 Bash Patch
1920000 = 992000 Post Bash Patch
1930000 = 993000 Dynamic Patches (Sky Proc)
1939999 = 993999 SUM.esp
1940000 = 994000 Qotsafan Compatibility Patches
1950000 = 995000
1960000 = 996000
1970000 = 997000 Deadly Combat PISE Patches
1980000 = 998000
```

See [loot/skyrim#26](https://github.com/loot/skyrim/issues/26) for details.

# Oblivion

```
-400999000 = -999000 Oblivion.esm
-400980000 = -980000 DLCShiveringIsles.esp
-400970000 = -970000 DLCHorseArmor.esp
-400960000 = -960000 DLCOrrery.esp
-400950000 = -950000 DLCVileLair.esp
-400940000 = -940000 DLCMehrunesRazor.esp
-400930000 = -930000 DLCSpellTomes.esp
-400920000 = -920000 DLCThievesDen.esp
-400910000 = -910000 DLCBattlehornCastle.esp
-400900000 = -900000 DLCFrostcrag.esp
-400890000 = -890000 Knights.esp
0
400910000 = 991000 Bash Patch
400920000 = 992000
400930000 = 993000
400940000 = 994000
400950000 = 995000
400960000 = 996000
400970000 = 997000
400980000 = 998000
400990000 = 999000
```

See [loot/oblivion#7](https://github.com/loot/oblivion/issues/7) for details.

# Fallout: New Vegas

*To be determined...*

# Fallout 3

```
-400999000 = -999000 Official DLCs, Unofficial patch
-300990000 = -990000 Patches besides the unofficial patch
0
 400991000 =  991000 Bashed Patch
```

*Based on current usage. Further details to be determined.*
