What needs to be done to release a new version of LOOT.

### Preparation

1. Make sure that the version history has been updated, and the release date has been filled in in the readme and the API header file.
2. Update the version numbers in `src/api/api.h`, `src/backend/globals.cpp`, `src/resource.rc` and `src/installer.nsi`.
3. Compile the .mo translation files from the .po files in the `loot` repository.
4. Generate a new LaTeX copy of the API documentation, and from that generate a PDF.

### Packaging & Release

1. Build an x86 LOOT executable.
2. Build an x86 LOOT API DLL.
2. Run the installer script.
3. Run the archiver archive.
4. Create a release on GitHub and add installer and both archives (application and API) to it.

### Website

1. Update the link on the homepage to point to the new release.
2. Commit the release's documentation to an appropriate subfolder in the `docs` directory, and update `docs/index.html` to list it.

### Masterlists

Update the "update released" message version check in each masterlist:
* Oblivion
* Skyrim
* Fallout 3
* Fallout: New Vegas