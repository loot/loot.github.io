If LOOT is crashing, or there is some other problem that's not due to missing or incorrect masterlist metadata, the following should be done.

1. In LOOT's settings, set the debug verbosity to its medium setting. (If you're running the 0.7 beta, it's an Enable Debug Logging checkbox instead.)
2. Run LOOT again to replicate the issue.
3. Upload the debug log that is generated at `%LOCALAPPDATA%\LOOT\LOOTDebugLog.txt` to some location you can share it from. If the log is less than 512 KB, you can upload it to [Pastebin](http://pastebin.com/) without requiring an account. Larger logs can be pasted as a [Gist](https://gist.github.com/) without requiring an account. Otherwise, a service such as Dropbox, Google Drive, OneDrive, etc. can be used. Please don't use filesharing websites with countdown timers or captchas.
4. If you're running the 0.7 beta, also upload the `%LOCALAPPDATA\LOOT\CEFDebugLog.txt`.

Note that LOOT wipes the log each time it starts, so if you encounter an issue, don't run LOOT again without first uploading or making a copy of the log.

### If LOOT is crashing on startup

If LOOT is crashing on startup, so you can't get to its settings dialog, its settings file can be manually edited to enable debug logging.

1. Open `%LOCALAPPDATA%\LOOT\settings.yaml` in a text editor, eg. Notepad.
2. Edit the line beginning `Debug Verbosity:` so that it becomes `Debug Verbosity: 2`.
3. Save the file.

Then run LOOT and upload your debug log as detailed above.