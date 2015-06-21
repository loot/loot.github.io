What needs to be done to release a new version of LOOT.

### Preparation

1. Make sure that the release date and version history have been updated in the readme and `src/api/api.h`.
2. Update the version numbers in `src/api/api.h`, `src/backend/globals.cpp.in`, `src/resource.rc` and `src/installer.nsi`.
3. Compile the .mo translation files from the .po files in the `loot` repository.
4. Generate a new LaTeX copy of the API documentation, and from that generate a PDF.

### Masterlists

1. If the new release makes metadata syntax changes:
  1. For each masterlist, create a new version branch for that release.
  2. For each masterlist, set the default repository branch on GitHub to the new branch.
  3. Update the default masterlist branch settings for each game, in `src/backend/game/game_settings.cpp` and `src/gui/loot_state.cpp`.
4. Update the "update released" message version check in each masterlist's previous version branch.

### Packaging

1. Build an x86 LOOT executable.
2. Build an x86 LOOT API DLL.
2. Run the installer script.
3. Run the archiver archive.

### Release!

1. Create a release in GitHub's loot/loot repository and add installer and both archives (application and API) to it.
2. Update the link on the LOOT's website homepage to point to the new release.
3. Commit the release's documentation to an appropriate subfolder in the `docs` directory of LOOT's website repository, and update `docs/index.html` to list it.
4. Post an announcement in the official forum thread.