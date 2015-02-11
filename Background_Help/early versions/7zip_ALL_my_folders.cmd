FOR /D %%I IN (*) DO "C:\Program Files\7-Zip\7z.exe" a "%%I.7z" -r ".\%%I\*"

::SENDTO is located in users/(me)/appdata/roaming/microsoft/windows/sendto
::added %% insetead of every %
::need a send to that deletes one by one....

:: if you have a shortcut in  send to it strangely seems to sometimes decide the root directory is the one of the script
:: but if you start the shortcut in no location (delete the 'start in') this seems to fix it
:: I named a folder lots of words and characters and it was still ok


