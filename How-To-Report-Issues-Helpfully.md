### Identifying The Issue

The first step is to identify what type of issue you're having, so that you can report it in the most appropriate place. Issues can be one of two basic types:

1. A metadata issue. It's probably this type if LOOT displays incorrect information, such as incorrect messages and Bash Tag suggestions. It's also probably a metadata issue if LOOT sorts your mods incorrectly, as it's most likely because it's lacking some sorting metadata, or the sorting metadata it has is incorrect.
2. An application issue. It's probably this type if LOOT behaves incorrectly or unexpectedly, such as crashing or doing the wrong thing when you click on a button. Some sorting mistakes can also be due to application issues, but it's best to treat them as metadata issues unless you know otherwise.

Metadata issues are also game-specific, so make a note of which game you're having the issue with.

### Reporting The Issue

Once you know which type of issue yours is, it's time to report it. It's best to report issues on LOOT's issue trackers, where they can't get lost, overlooked or disorganised, but doing so requires a free GitHub account. The links below can be used to report your issue in the appropriate tracker.

* [Oblivion metadata](https://github.com/loot/oblivion/issues/new)
* [Skyrim metadata](https://github.com/loot/skyrim/issues/new)
* [Fallout 3 metadata](https://github.com/loot/fallout3/issues/new)
* [Fallout: New Vegas metadata](https://github.com/loot/falloutnv/issues/new)
* [Fallout 4 metadata](https://github.com/loot/fallout4/issues/new)
* [LOOT application](https://github.com/loot/loot/issues/new)

If you don't have a GitHub account and don't want to sign up for one, you can instead report the issue in LOOT's official forum thread.

#### Supplying Debug Logs For Application Issues

If you're experiencing an application issue, you should supply debug logs to help solve the issue. You can do this by following the instructions below.

1. In LOOT's settings, toggle the Enable Debug Logging checkbox on.
2. Run LOOT again to replicate the issue.
3. Upload the `LOOTDebugLog.txt` and `CEFDebugLog.txt` files generated in the `%LOCALAPPDATA%\LOOT` folder.

If you're reporting the issue in the LOOT application issue tracker, you can attach the log files to your report by dragging and dropping them into the report's text box.

Otherwise, [Pastebin](http://pastebin.com/) can be used for logs smaller than 512 KB, or a service such as Dropbox, Google Drive, OneDrive, etc. can be used. Please don't use filesharing websites with countdown timers or captchas.

Note that LOOT wipes the log each time it starts, so if you encounter an issue, don't run LOOT again without first uploading or making a copy of the log.

##### If you can't reach the settings dialog

If LOOT is crashing on startup, or you can't get to its settings dialog for some other reason, its settings file can be manually edited to enable debug logging.

1. Open `%LOCALAPPDATA%\LOOT\settings.yaml` in a text editor, eg. Notepad.
2. Replace the text `enableDebugLogging: false` with `enableDebugLogging: true`.
3. Save the file.

Then run LOOT and upload your debug log as detailed above.