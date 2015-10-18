If LOOT is crashing, or there is some other problem that's not due to missing or incorrect masterlist metadata, the following should be done.

1. In LOOT's settings, toggle the Enable Debug Logging checkbox on.
2. Run LOOT again to replicate the issue.
3. Upload the `LOOTDebugLog.txt` and `CEFDebugLog.txt` files generated in the `%LOCALAPPDATA%\LOOT` folder.

It's best to report the issue on the LOOT application's [issue tracker](https://github.com/loot/loot/issues/new), where you can upload the log files by attaching them to your report (drag 'n' drop them into the text box), but doing so requires a GitHub account.

Otherwise, if the log is less than 512 KB, you can upload it to [Pastebin](http://pastebin.com/) without requiring an account. Otherwise, a service such as Dropbox, Google Drive, OneDrive, etc. can be used. Please don't use filesharing websites with countdown timers or captchas.

Note that LOOT wipes the log each time it starts, so if you encounter an issue, don't run LOOT again without first uploading or making a copy of the log.

### If you can't reach the settings dialog

If LOOT is crashing on startup, or you can't get to its settings dialog for some other reason, its settings file can be manually edited to enable debug logging.

1. Open `%LOCALAPPDATA%\LOOT\settings.yaml` in a text editor, eg. Notepad.
2. Replace the text `enableDebugLogging: false` with `enableDebugLogging: true`.
3. Save the file.

Then run LOOT and upload your debug log as detailed above.