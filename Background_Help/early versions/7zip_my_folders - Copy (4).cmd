@echo off

::	This script will 7zip folders. Its intended to be put in a directory and a shortcut be made in Windows SendTo folder
::	This is intended to be used on static folder not ones which could be updated while the script is running
::	Mtee.exe needs to downloaded and put in the script directory http://commandline.co.uk/mtee/index.html 

::	get the script directory for mtee - if we don't do this now shift will lose it. Also set direcoty to folders
::	the ~dp0 is explained at http://www.microsoft.com/resources/documentation/windows/xp/all/proddocs/en-us/percent.mspx?mfr=true

set scriptdir=%~dp0
set folderdir=%~dp1
cd /d %~dp1
if exist "%folderdir%7ZIP_MY_FOLDERS.log" del "%folderdir%7ZIP_MY_FOLDERS.log"



::	first we setup a loop, so we process each command line parameter in turn, and goto done when there are no more files to process

:LOOP

if (%1)==() goto END


::	get folder name without quotes, since the 7z arguement has to have quotes 
::	Set a short filename for the error log too - filename with extension

set folder=%~1
set shortfolder=%~nx1


:: check for empty folder, existing file, and file is not a folder

dir /b /a %1 | findstr .>nul || goto EMPTYFOLDER
if exist "%folder%.7z" goto 7ZEXISTS
if not exist "%folder%\" goto NOTFOLDER



::	then have 7zip make archive of the folder name, and add all /* files in the folder to it. This prevents 'folder in zip' syndrome 
::	7zip didn't like .\ at the begginning of the latter. Removing it made this work

"C:\Program Files\7-Zip\7z.exe" a "%folder%.7z" -r "%folder%\*" 2<&1

::	Check that the archiving went ok. Otherwise report

set error=%errorlevel%
if %error% NEQ 0 goto CREATEERROR


:: 	Now test archive - note I've specified recursive testing of folders inside the archive,
::	and output error and stdout to log -don't think either make any difference

echo.Testing Archive %folder%.7z...
echo.Datestamp is %date%, %time% >> 7ZIP_MY_FOLDERS.log
"C:\Program Files\7-Zip\7z.exe" t -r "%folder%.7z" >>7ZIP_MY_FOLDERS.log 2>&1
set error=%errorlevel%
if %error% EQU 0 echo.%shortfolder%.7z ALL OK | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
if %error% NEQ 0 goto TESTERROR


:CONTINUE
echo.____________________________________________>>7ZIP_MY_FOLDERS.log
echo.____________________________________________>>7ZIP_MY_FOLDERS.log

::	then we shift the command line parameters up one, and loop back to the start
::	http://stackoverflow.com/questions/935609/batch-parameters-everything-after-1

shift
goto LOOP

:EMPTYFOLDER
echo.This folder is empty
echo.Datestamp is %date%, %time% >> 7ZIP_MY_FOLDERS.log
echo.%shortfolder% error empty folder | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
if exist "%folder%.7z" goto 7ZEXISTS
goto CONTINUE

:7ZEXISTS
echo.%shortfolder% already exists - checking...
echo.Datestamp is %date%, %time% >> 7ZIP_MY_FOLDERS.log
"C:\Program Files\7-Zip\7z.exe" t "%folder%.7z" >>7ZIP_MY_FOLDERS.log 2>&1
set error=%errorlevel%
if %error% EQU 0 echo.%shortfolder%.7z ALREADY EXISTS and appears valid as error code is %error% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
if %error% NEQ 0 echo.%shortfolder%.7z ALREADY EXISTS AND APPEARS CORRUPT as error code is %error% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
goto CONTINUE


:NOTFOLDER
:	Check that the filtetype is not a 7z or a zip already
if (%~x1)==(.7z) goto 7ZIPALREADY
if (%~x1)==(.zip) goto ZIPALREADY
echo.Datestamp is %date%, %time% >> 7ZIP_MY_FOLDERS.log
echo.%shortfolder% error not a folder | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
goto CONTINUE

:7ZIPALREADY
echo.%shortfolder% is a 7zip file already - checking...
echo.Datestamp is %date%, %time% >> 7ZIP_MY_FOLDERS.log
"C:\Program Files\7-Zip\7z.exe" t "%folder%" >>7ZIP_MY_FOLDERS.log 2>&1
set error=%errorlevel%
if %error% EQU 0 echo.%shortfolder% is ALREADY a 7Zip and appears ok as error code is %error% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
if %error% NEQ 0 echo.%shortfolder% is ALREADY a 7Zip and APPEARS CORRUPT as error code is %error% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
goto CONTINUE

:ZIPALREADY
echo.%shortfolder% is a Zip file - checking...
echo.Datestamp is %date%, %time% >> 7ZIP_MY_FOLDERS.log
"C:\Program Files\7-Zip\7z.exe" t "%folder%" >>7ZIP_MY_FOLDERS.log 2>&1
set error=%errorlevel%
if %error% EQU 0 echo.%shortfolder% is Zip File and appears ok as error code is %error% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
if %error% NEQ 0 echo.%shortfolder% is Zip File and APPEARS CORRUPT as error code is %error% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
goto CONTINUE

:CREATEERROR
echo.Couldn't create the 7zip
echo.Datestamp is %date%, %time% >> 7ZIP_MY_FOLDERS.log
echo.%folder%.7z ARCHIVE CREATE ERROR as error code is %error% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
goto CONTINUE

:TESTERROR
echo.Datestamp is %date%, %time% >> 7ZIP_MY_FOLDERS.log
echo.%folder%.7z ARCHIVE TEST ERROR as error code is %error% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
goto CONTINUE

:END
echo.
echo.FINISHED - REPORTED PROBLEMS IN LOG ARE:
echo.
find "error"<7ZIP_MY_FOLDERS.log
FOR %%V IN (scriptdir folderdir folder shortfolder error) DO SET %%V=

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
