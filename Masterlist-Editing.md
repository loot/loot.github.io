The purpose of this page is to give a bit of information to help with editing a masterlist.

### General Hints

* Look in the masterlists for examples, and see the [Metadata Syntax](http://loot.github.io/docs/dev/LOOT%20Metadata%20Syntax.html) document for the details.
* Only make edits/additions you're confident about - otherwise create an issue in the masterlist repository's issue tracker, or discuss in the BethSoft forum thread.
* If you're using Notepad++, you can set it to use spaces instead of tabs when you press the tab key on your keyboard, avoiding YAML parsing errors. To do this, go to Settings > Preferences > Tab Settings > Replace by space. A value of 4 is most common.
* Make as many silent comments as you want within the masterlists - it doesn't hurt (within reason). However, make sure to put them *above* the line(s) that they refer to.
* Use blank lines to separate mods that are grouped together or where it helps readability.
* Where you put a plugin doesn't matter - you may want to see if there are any related plugins in the masterlist already and group them together, or you can just add the plugin to the end of the list.
* Test your changes before uploading them, to make sure you didn't make any syntax mistakes. See [[Quickly Testing Your Masterlist Changes|Quickly-Testing-Your-Masterlist-Changes]] for instructions.

### Writing Style

For consistency and to make it easier for people to understand what others have written, it's best to use the following style points when editing the masterlist.

* Child data nodes should be indented two spaces from their parents, for the best trade-off between compactness and readability.
* Maps should be written in YAML's "block" style. Lists should also use the "block" style, unless they contain only one element, in which case the "flow" style can be used for compactness.
* Arbitrary string values should be enclosed in single quotes. If the string contains any single quotes, they should be repeated. The string uses below are exempt from quotation, as they have a very limited range of possible values.
  * Message types
  * Bash Tag names
  * YAML map keys
  * Language codes

The above points are illustrated in the following example.

```yaml
name: 'Oscuro''s_Oblivion_Overhaul.esm'
req:
  - name: 'example.esp'
    display: '[Example Mod](http://www.example.com)'
    condition: 'version("Oscuro''s_Oblivion_Overhaul.esm", "15.0", ==)'
tag:
  - Actors.Spells
  - Graphics
  - Invent
  - Relations
  - Scripts
  - Stats
  - name: -Relations
    condition: 'file("Mart''s Monster Mod for OOO.esm") or file("FCOM_Convergence.esm")'
msg:
  - type: say
    content: 'Do not clean. "Dirty" edits are intentional and required for the mod to function.'
    lang: eng
url: [ 'http://oblivion.nexusmods.com/mods/15256' ]
```
```yaml
{name: Oscuro's_Oblivion_Overhaul.esm, req: [{ name: example.esp, display: '[Example Mod](http://www.example.com)', condition: 'version("Oscuro''s_Oblivion_Overhaul.esm", "15.0", ==)' }], tag: [ Actors.Spells, Graphics, Invent, Relations, Scripts, Stats, { name: -Relations, condition: file("Mart's Monster Mod for OOO.esm") or file("FCOM_Convergence.esm") }], msg: [{ type: say, content: Do not clean. "Dirty" edits are intentional and required for the mod to function., lang: eng }], url: [ http://oblivion.nexusmods.com/mods/15256 ]}
```
Although both are valid YAML, the first is using the correct style, and the second is not.

**Note:** Much of the masterlists' content is machine-generated, and as such does not follow the writing style given above. This isn't an issue, and it's not worth spending time systematically changing all the generated entries, but if you're editing a generated entry, you might as well correct its style while you're at it.

### Adding New Entries

Before you add a new entry for a plugin, make sure that there isn't already an existing entry for it. LOOT will attempt to merge entries if there are more than one for a plugin, but some metadata may be lost in the process, so it's always safer to only have one entry per plugin. 

*Don't* open the masterlist and to a `Ctrl-F` search for the plugin filename, or anything similar. Instead, use the online [Masterlist Search](http://loot.github.io/search/) page to perform a search of the masterlist. This search utility has the following features:

* Accounts for syntax variation.
* Finds matching regular expression entries.
* Checks against the latest masterlist revision, so is always up-to-date.
* Case-insensitive.

You can even pass search parameters in the URL, using the syntax

```yaml
http://loot.github.io/search/?game=<game>&search=<search>
```

where `<game>` can be one of `oblivion`, `skyrim`, `fallout3` and `falloutnv`. `<search>` is the string you want to search for.

### Multiple Matching Plugin Entries

If a plugin has more than one matching entry in the masterlist, they are partially merged, making having multiple matching entries a useful strategy in some cases.

Plugin Data Structure Field | Merge Behaviour (merging B into A)
----------------------------|-----------------------------------
`name` | Not merged
`enabled` | Replaced but must be `true` anyway.
`priority` | Replaced by B's value.
`after` | Merged. If A and B both contain an entry with the same <code>name</code> value, B's copy is skipped.
`req` | Merged. If A and B both contain an entry with the same <code>name</code> value, B's copy is skipped.
`inc` | Merged. If A and B both contain an entry with the same <code>name</code> value, B's copy is skipped.
`msg` | Merged. If A and B both contain an entry with the same content string (if there are multiple content strings, the first is checked), then B's copy is skipped.
`tag` | Merged. If A and B both contain an entry with the same <code>name</code> value, B's copy is skipped, unless one is suggesting the tag for addition and the other is suggesting it for removal, in which case both entries are kept.
`url` | Currently skipped by the parser, so neither A nor B will contain any entries anyway.
`dirty` | Merged. If A and B both contain an entry with the same <code>crc</code> value, B's copy is skipped.

Merging only takes place if both entries have their `enabled` field set to `true` (which is the default if unspecified).

### Common Metadata

Often the same metadata is used for plugins throughout the masterlist, for example generic messages. Rather than having these messages copy/pasted, YAML's anchor/alias feature can be used to define (anchor) the metadata once somewhere, then reference (alias) it wherever else it needs to be used. This has the advantages of guaranteeing consistency, eliminating typos, cutting down the overall size of the masterlist, and improving readability.

In the masterlists, everything that gets anchored and aliased in this manner should go in the `common` node, which is a sibling of the `plugins` and `globals` nodes that are mentioned in the Metadata Syntax documentation. The `common` node is ignored by LOOT, but the YAML parser still reads it, and will therefore still substitute any aliases made. By putting all the anchors in one place, it makes it easy for other maintainers to take advantage of any existing anchors, and avoids any duplication of anchors.

An example demonstrating just how much of a difference anchors/aliases can make:

```yaml
common:
  - &useBP
    type: say
    content:
      - str: 'Use Bashed Patch tweak instead.'
        lang: eng
      - str: 'Используйте вместо этого настройку башед патча.'
        lang: rus
    condition: 'regex("Bashed Patch.*\.esp")'
  - &dirtyDoNotClean
    type: 'say'
    content:
      - str: 'Do not clean. "Dirty" edits are intentional and required for the mod to function.'
        lang: eng
      - str: 'Не очищать. "Грязные" правки оставлены специально и требуются для функционирования мода.'
        lang: rus
  - &skse1.6.5
    name: '..\skse_loader.exe'
    display: 'Skyrim Script Extender v1.6.5+'
    condition: 'version("..\skse_loader.exe", "0.1.6.5", <)'

plugins:
  - name: 'BBLuxurySuite.esm'
    msg: [ *dirtyDoNotClean ]
  - name: 'Convenient Horses.esp'
    msg: [ *dirtyDoNotClean ]
  - name: '72HoursRespawn.esp'
    msg: [ *useBP ]
  - name: 'Respawn\w{3,5}Days{0,1}\.esp'
    msg: [ *useBP ]
  - name: 'Skyrim 120 Day Respawn.esp'
    msg: [ *useBP ]
  - name: 'kuerteeDisableLightsFarFromActors.esp'
    req: [ *skse1.6.5 ]
  - name: 'CUYC_CleanUpYourCorpses.esp'
    req: [ *skse1.6.5 ]
   
```

Notice how in the example above, the `common` node has two different types of data structure in the same list (message and file structures). If this was done anywhere in the `globals` or `plugins` nodes LOOT would complain, because it expects a certain format, but because LOOT doesn't look at the `common` node, this is OK.

### Dirty Edit Metadata

If a user posts dirty counts for a plugin that already has a dirty message for the same CRC, and the counts are different to what's in the masterlist, just replace the existing counts with what the user gave if they used the latest version of TES5Edit. If they didn't give the TES5Edit version number, only replace the existing counts if the new counts are higher (which generally indicates a newer version).

#### Intentional ITMs

A very tiny minority of dirty edits (and only ever ITMs) are intentional and should not be removed - this is for cases where a mod will not function correctly unless certain data have their vanilla values, so the mod includes a copy of the vanilla data to override anything that might change it.

Mod authors who don't have a good understanding of dirty edits will often claim that their edits are required - you must download the mod in question and see for yourself if any such claim is made.

### Adding Bash Tags

Before adding a tag to a mod, it is recommended that you:

1. Check the mod in TES4Edit or equivalent to see if it does actually require that tag.
2. Think about the nature of the mod, is it designed so that it is OK if things get overriden, or will it malfunction if that occurs?
3. Read the mod documentation and the mod description field in Wrye Bash to check whether the mod author has supplied any tags with it, or recommended any to be added.

That should ensure you have the correct information, so you can start to add the necessary tags. Use the Wrye Bash/Flash/Flash NV readme as a reference.

### Translating Messages

If you add a message, there are two ways to go about getting it translated into the other languages LOOT supports:

* If you are fluent in one of the other supported languages, feel free to translate it yourself. Don't just use a translator such as Google Translate though.
* Chances are that you won't be able to translate it into all the languages LOOT supports, so create an issue in the issue tracker for the repository to which the masterlist you're editing belongs. If it's a message defined in the `common` section of the masterlist, say so. Otherwise, quote the plugin filename to which it is attached. Also quote the English text of message itself, and label the issue with the appropriate translate-language labels so that it can be easily seen by translators.