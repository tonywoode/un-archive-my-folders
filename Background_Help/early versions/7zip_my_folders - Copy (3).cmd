@echo off
::	This script will 7zip folders. Its intended to be put in a directory and a shortcut be made in Windows SendTo folder
::	This is intended to be used on static folder not ones which could be updated while the script is running
::	Mtee.exe needs to downloaded and put in the script directory http://commandline.co.uk/mtee/index.html 

::	get the script directory for mtee - if we don't do this now shift will lose it. Also set direcoty to folders
::	the ~dp0 is explained at http://www.microsoft.com/resources/documentation/windows/xp/all/proddocs/en-us/percent.mspx?mfr=true

set scriptdir=%~dp0
set folderdirectory=%~dp1
cd /d %~dp1
if exist "%folderdirectory%7zipERRORS_THIS_SESSION.log" del "%folderdirectory%7zipERRORS_THIS_SESSION.log"



::	first we setup a loop, so we process each command line parameter in turn, and goto done when there are no more files to process

:LOOP

if (%1)==() goto END


::	get folder name without quotes, since the 7z arguement has to have quotes 
::	Set a short filename for the error log too - filename with extension

set folder=%~1
set shortfolder=%~nx1


:: check for empty folder, existing file, file itself is a zip and not a folder
dir /b /a %1 | findstr .>nul || goto EMPTYFOLDER
if exist "%folder%.7z" goto CHECK
if not exist "%folder%\" goto NOTFOLDER



::	then have 7zip make archive of the folder name, and add all /* files in the folder to it. This prevents 'folder in zip' syndrome 
::	7zip didn't like .\ at the begginning of the latter. Removing it made this work

"C:\Program Files\7-Zip\7z.exe" a "%folder%.7z" -r "%folder%\*" 2<&1

::	Check that the archiving went ok. Otherwise report
if errorlevel 1 got CREATEERROR


:: 	Now test archive - note I've specified recursive testing of folders inside the archive,
::	and output error and stdout to screen and tee -don't think either make any difference

echo. Testing Archive %folder%.7z...
echo Datestamp is %date%, %time% >> 7zip%DATE:/=%.log
"C:\Program Files\7-Zip\7z.exe" t -r "%folder%.7z" 2<&1 | "%scriptdir%/mtee.exe" /+ 7zip%DATE:/=%.log

::	if it works echo that to screen and script, otherwise echo error. Good things on error levels if you IF /?

if "%errorlevel%"=="0" echo. %shortfolder%.7z ALL OK | "%scriptdir%/mtee.exe" /+ 7zip%DATE:/=%.log /+ 7zipERRORS_THIS_SESSION.log
if errorlevel 1 goto TESTERROR


:CONTINUE

::	then we shift the command line parameters up one, and loop back to the start
::	http://stackoverflow.com/questions/935609/batch-parameters-everything-after-1

shift
goto LOOP

:EMPTYFOLDER
echo Datestamp is %date%, %time% >> 7zip%DATE:/=%.log
echo. %shortfolder% error empty folder | "%scriptdir%/mtee.exe" /+ 7zip%DATE:/=%.log /+ 7zipERRORS_THIS_SESSION.log
echo. ___________________________________________ >>7zip%DATE:/=%.log
echo. ____________________________________________>>7zip%DATE:/=%.log
if exist "%folder%.7z" goto CHECK else goto CONTINUE

:CHECK
echo. %shortfolder% already exists - checking...
echo Datestamp is %date%, %time% >> 7zip%DATE:/=%.log
"C:\Program Files\7-Zip\7z.exe" t "%folder%.7z"  2<&1 | "%scriptdir%/mtee.exe" /+ 7zip%DATE:/=%.log
if "%errorlevel%"=="0" echo. %shortfolder%.7z ALREADY EXISTS and appears valid as error code is %errorlevel% | "%scriptdir%/mtee.exe" /+ 7zip%DATE:/=%.log /+ 7zipERRORS_THIS_SESSION.log
if errorlevel 1 echo. %shortfolder%.7z ALREADY EXISTS AND APPEARS CORRUPT as error code is %errorlevel% | "%scriptdir%/mtee.exe" /+ 7zip%DATE:/=%.log /+ 7zipERRORS_THIS_SESSION.log
echo. ___________________________________________ >>7zip%DATE:/=%.log
echo. ____________________________________________>>7zip%DATE:/=%.log
goto CONTINUE



:NOTFOLDER
if (%~x1)==(.7z) goto 7ZIPALREADY
echo Datestamp is %date%, %time% >> 7zip%DATE:/=%.log
echo %shortfolder% error not a folder | "%scriptdir%/mtee.exe" /+ 7zip%DATE:/=%.log /+ 7zipERRORS_THIS_SESSION.log
echo. ___________________________________________ >>7zip%DATE:/=%.log
echo. ____________________________________________>>7zip%DATE:/=%.log
goto CONTINUE

:7ZIPALREADY
echo. %shortfolder% is a 7zip file already - checking...
echo Datestamp is %date%, %time% >> 7zip%DATE:/=%.log
"C:\Program Files\7-Zip\7z.exe" t "%folder%"| "%scriptdir%/mtee.exe" /+ 7zip%DATE:/=%.log
if "%errorlevel%"=="0" echo. %shortfolder%. is ALREADY a 7Zip and appears valid as error code is %errorlevel% | "%scriptdir%/mtee.exe" /+ 7zip%DATE:/=%.log /+ 7zipERRORS_THIS_SESSION.log
if errorlevel 1 echo. %shortfolder%.7z is ALREADY a 7Zip AND APPEARS CORRUPT as error code is %errorlevel% | "%scriptdir%/mtee.exe" /+ 7zip%DATE:/=%.log /+ 7zipERRORS_THIS_SESSION.log
echo. ___________________________________________ >>7zip%DATE:/=%.log
echo. ____________________________________________>>7zip%DATE:/=%.log
goto CONTINUE


:CREATEERROR
echo Datestamp is %date%, %time% >> 7zip%DATE:/=%.log
echo. %folder%.7z ARCHIVE CREATE ERROR as error code is %errorlevel% | "%scriptdir%/mtee.exe" /+ 7zip%DATE:/=%.log /+ 7zipERRORS_THIS_SESSION.log
echo. ___________________________________________ >>7zip%DATE:/=%.log
echo. ____________________________________________>>7zip%DATE:/=%.log
goto CONTINUE

:TESTERROR
echo Datestamp is %date%, %time% >> 7zip%DATE:/=%.log
echo. %folder%.7z ARCHIVE TEST ERROR as error code is %errorlevel% | "%scriptdir%/mtee.exe" /+ 7zip%DATE:/=%.log /+ 7zipERRORS_THIS_SESSION.log
echo. ___________________________________________ >>7zip%DATE:/=%.log
echo. ____________________________________________>>7zip%DATE:/=%.log
goto CONTINUE

:END
echo.
echo. FINISHED - REPORTED PROBLEMS IN LOG ARE:
echo.
find "error"<7zipERRORS_THIS_SESSION.log
FOR %%V IN (scriptdir folder shortfolder) DO SET %%V=

pause

::	to do: what happens if its an empty folder but a 7z also already exists with that name, what happens if its a fodler with just an empty folder or file in it
::	to do: clrear up reporting and pipe at end of windows with fails only. what to do about things that aren't folders. What to do about 7zip files (currently it makes a 0k .7z.7z file). Deletion
::	to do: corrupt 7zips are returning errorcode of 0 ????
::	to remove files this is suggested
::	C:\temp>7z a -tZIP -r testarchive *.log&7z t testarchive.zip&&del /s *.log
::	but it won't remove directorys. Before I've used this
:: 	rd /s /q "%1.temp"




::	Heres a list of error codes for 7zip from 2008. Note the commenting out.
::	from http://sourceforge.net/projects/sevenzip/forums/forum/45797/topic/2670878
::
::	kSuccess = 0, // Successful operation
::	kWarning = 1, // Non fatal error(s) occurred
::	kFatalError = 2, // A fatal error occurred
::	// kCRCError = 3, // A CRC error occurred when unpacking
::	// kLockedArchive = 4, // Attempt to modify an archive previously locked
::	// kWriteError = 5, // Write to disk error
::	// kOpenError = 6, // Open file error
::	kUserError = 7, // Command line option error
::	kMemoryError = 8, // Not enough memory for operation
::	// kCreateFileError = 9, // Create file error
::
::	kUserBreak = 255 // User stopped the process
::
::	(From latest source, note that several codes are commented out) 
