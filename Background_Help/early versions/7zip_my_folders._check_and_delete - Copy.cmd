@echo off
::use me if probs

::first we setup a loop, so we process each command line parameter in turn

:loop
::use me if probs
::echo %1
::pause

if (%1)==() goto end

::then we get the folder name without quotes, since we need the 7z arguement to have quotes. this is what the tilde does
::http://www.microsoft.com/resources/documentation/windows/xp/all/proddocs/en-us/percent.mspx?mfr=true

set folder=%~1


::then we send 7zip the command to make an archive of the folder name, and crucially to add all /* files in the folder
::without that you get the bloody folder inside the zip 
::7zip didn't like .\ at the begginning of the latter. Removing it made this work

"C:\Program Files\7-Zip\7z.exe" a "%folder%.7z" -r "%folder%\*"

::".\%file%\*"

::then we shift the command line parameters up one, and loop back to the start
::http://stackoverflow.com/questions/935609/batch-parameters-everything-after-1

shift

goto loop

:end

::to do is LOGGING 
:: then check files and remove
::to remove files this is suggested
::C:\temp>7z a -tZIP -r testarchive *.log&7z t testarchive.zip&&del /s *.log
::but it won't remove directorys. Before I've used this
:: rd /s /q "%1.temp"


