The purpose of this page is to give a bit of detail on the masterlist editing process itself.

### General Hints

* Only make edits/additions you're confident about - otherwise discuss on the Bethsoft forum threads or via Private Message. You can also create an issue in the masterlist repository's issue tracker.
* Check out the masterlists and become familiar with the comments and categorisations therein. See the `docs/BOSS Masterlist Syntax.html` file in the `boss-code` repository for the details.
* Make as many silent comments as you want within the masterlists - it doesn't hurt (within reason).
* Use blank lines to separate mods that are grouped together or where it helps readability.
* Test your changes before uploading them, to make sure you didn't make any syntax mistakes. This is best done by running your edited masterlist through BOSS - make sure to first disable masterlist updating though, or else BOSS may overwrite your edited one with the latest in the repository!

### Adding New Entries

Before you add a new entry for a plugin, make sure that there isn't already an existing entry for it. BOSS will attempt to merge entries if there are more than one for a plugin, but some metadata may be lost in the process, so it's always safer to only have one entry per plugin. 

Simply opening up the masterlist and doing a `Ctrl-F` search for the plugin filename won't always be enough, because plugin entries can use regular expression matching to match multiple plugin names, and they won't be found. Instead, use the online [Masterlist Search](http://boss-developers.github.io/search/) page to perform a search of the masterlist. 

As well as being able to match regular expressions, it also checks against the same copy of the masterlist that BOSS users get, so you can be sure that it will always be up-to-date. It's case-insensitive and you can even pass search parameters in the URL. The syntax is

```yaml
http://boss-developers.github.io/search/?game=<game>&search=<search>
```

where `<game>` can be one of `oblivion`, `skyrim`, `fallout3` and `falloutnv`. `<search>` is the string you want to search for.

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

If you add a message, there are two ways to go about getting it translated into the other language BOSS supports:

* If you are fluent in one of the other supported languages, feel free to translate it yourself. Don't just use a translator such as Google Translate though.
* Chances are that you won't be able to translate it into all the languages BOSS supports, so create an issue in the issue tracker for the repository to which the masterlist you're editing belongs. If it's a message defined in the `common` section of the masterlist, say so. Otherwise, quote the plugin filename to which it is attached. Also quote the English text of message itself, and label the issue with the appropriate translate-language labels so that it can be easily seen by translators.

### Differences From v2

The differences are all detailed in the `docs/BOSS Masterlist Syntax.html` file in the `boss-code` repository. A few key behavioural differences are worth highlighting here though:

* In v2, each condition that checked the CRC of a different plugin would increase execution time, and there was a hierarchy of condition performance generally. In v3, all conditions are cached so they get calculated a maximum of once, and CRCs are calculated anyway during sorting, so they introduce no additional performance hit (and indeed are quicker than regex checks for it). Basically, conditions can no longer realistically impact performance in a noticeable way.
* In v2, compound conditions were evaluated left-to-right. In v3, they are evaluated according to the standard rules of operator precedence, ie. `<function>` before `not` before `and` before `or`.
