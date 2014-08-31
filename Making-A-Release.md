What needs to be done to release a new version of LOOT.

### Preparation

1. Make sure that the version history has been updated, and the release date has been filled in.
2. Compile the .mo translation files from the .po files in the `loot` repository.

### Packaging & Release

1. Build an x86 LOOT executable.
2. Compile the installer.
3. Put together the 7-Zip archive.
4. Create a release on GitHub and add the installer and archive to it.

### Website

1. Update the link on the homepage to point to the new release.
2. Commit the release's documentation to an appropriate subfolder in the `docs` directory, and update `docs/index.html` to list it.

### Masterlists

Update the "update released" message version check in each masterlist:
* Oblivion
* Skyrim
* Fallout 3
* Fallout: New Vegas