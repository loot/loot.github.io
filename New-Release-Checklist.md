What needs to be done to release a new version of BOSS.

### Preparation

1. Make sure that the version history has been updated, and the release date has been filled in.
2. Compile the .mo translation files from the .po files in the `boss-code` repository.

### Packaging & Release

1. Compile the .mo translation files from the .po files in the repository.
2. Build an x86 BOSS executable.
3. Compile the installer.
4. Put together the 7-zip archive.
5. Create a release on GitHub and add the installer and archive to it.

### Website

1. Update the link on the homepage to point to the new release.
2. Commit the release's documentation to an appropriate subfolder in the `docs` directory, and update `docs/index.html` to list it.

### Masterlists

Update the "update released" message version check in each masterlist:
* Oblivion
* Skyrim
* Fallout 3
* Fallout: New Vegas

### Forum Threads

Post a notification in each of the official threads. These are linked to on BOSS's [homepage](http://boss-developers.github.io).

### Nexus Sites

Update the version numbers on each Nexus file entry:
* [Oblivion Nexus](http://oblivion.nexusmods.com/mods/20516/)
* [Skyrim Nexus](http://skyrim.nexusmods.com/mods/6/)
* [Fallout 3 Nexus](http://fallout3.nexusmods.com/mods/10193/)
* [New Vegas Nexus](http://newvegas.nexusmods.com/mods/35999/)

### Initial v3 Release

The initial v3 release will also require some additional tasks to wrap up the move from Google Code:

* Push my latest commits to the `boss-developers.github.io` repository.
* Remove the Bugzilla link from the [Google Code page](https://code.google.com/p/better-oblivion-sorting-software/).
* Un-feature the v2.1.1 downloads at Google Code.
* Change the "we've moved" message at Google Code to reflect v3 being released.