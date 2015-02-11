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
echo.____________________________________________
echo.____________________________________________


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

echo.Datestamp is %date%, %time% >> 7ZIP_MY_FOLDERS.log
echo.Made 7Z Archive %shortfolder%.7z now testing archive... | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
"C:\Program Files\7-Zip\7z.exe" t -r "%folder%.7z" >>7ZIP_MY_FOLDERS.log 2>&1
set error=%errorlevel%
if %error% EQU 0 echo.%shortfolder%.7z CREATED AND TESTED - all OK | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
if %error% NEQ 0 goto TESTERROR


:CONTINUE
echo.____________________________________________>>7ZIP_MY_FOLDERS.log
echo.____________________________________________>>7ZIP_MY_FOLDERS.log

::	then we shift the command line parameters up one, and loop back to the start
::	http://stackoverflow.com/questions/935609/batch-parameters-everything-after-1

shift
goto LOOP

:EMPTYFOLDER
echo.Datestamp is %date%, %time% >> 7ZIP_MY_FOLDERS.log
echo.%shortfolder% is empty or doesn't exist | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
echo.%shortfolder% -----------------------ERROR empty folder or doesn't exist | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
::	also check whether a 7zip exists already with the empty folders name
if exist "%folder%.7z" echo.7zip also already exists for empty folder %shortfolder%  | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
if exist "%folder%.7z" goto 7ZEXISTS
goto CONTINUE

:7ZEXISTS
echo.Datestamp is %date%, %time% >> 7ZIP_MY_FOLDERS.log
echo.%shortfolder%.7z already exists - checking... | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
"C:\Program Files\7-Zip\7z.exe" t "%folder%.7z" >>7ZIP_MY_FOLDERS.log 2>&1
set error=%errorlevel%
if %error% EQU 0 echo.%shortfolder%.7z ALREADY EXISTS and appears valid ERROR code is %error% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
if %error% NEQ 0 echo.%shortfolder%.7z ALREADY EXISTS and APPEARS CORRUPT ERROR code is %error% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
goto CONTINUE


:NOTFOLDER
:	Check that the filtetype is not a 7z or a zip already
if (%~x1)==(.7z) goto 7ZIPALREADY
if (%~x1)==(.zip) goto ZIPALREADY
echo.Datestamp is %date%, %time% >> 7ZIP_MY_FOLDERS.log
echo.%shortfolder% not a folder, not processing | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
echo.%shortfolder% ERROR not a folder | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
goto CONTINUE

:7ZIPALREADY
echo.Datestamp is %date%, %time% >> 7ZIP_MY_FOLDERS.log
echo.%shortfolder% is a 7zip file already - checking... | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
"C:\Program Files\7-Zip\7z.exe" t "%folder%" >>7ZIP_MY_FOLDERS.log 2>&1
set error=%errorlevel%
if %error% EQU 0 echo.%shortfolder% is ALREADY a 7Zip and appears ok ERROR code is %error% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
if %error% NEQ 0 echo.%shortfolder% is ALREADY a 7Zip and APPEARS CORRUPT ERROR code is %error% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
:: also check it isn't a 1kb file
if %~z1 LEQ 32 echo.%shortfolder% ADDITIONAL ERROR - LESS THAN 1KB IN SIZE  | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
goto CONTINUE

:ZIPALREADY
echo.Datestamp is %date%, %time% >> 7ZIP_MY_FOLDERS.log
echo.%shortfolder% is a Zip file - checking... | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
"C:\Program Files\7-Zip\7z.exe" t "%folder%" >>7ZIP_MY_FOLDERS.log 2>&1
set error=%errorlevel%
if %error% EQU 0 echo.%shortfolder% is Zip File and appears ok ERROR code is %error% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
if %error% NEQ 0 echo.%shortfolder% is Zip File and APPEARS CORRUPT ERROR code is %error% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
:: also check it isn't a 1kb file
if %~z1 LEQ 32 echo.%shortfolder% ADDITIONAL ERROR - LESS THAN 1KB IN SIZE  | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
goto CONTINUE

:CREATEERROR
echo.Datestamp is %date%, %time% >> 7ZIP_MY_FOLDERS.log
echo.Couldn't create the 7zip from %shortfolder% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
echo.%shortfolder%.7z ARCHIVE CREATE ERROR code is %error% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
goto CONTINUE

:TESTERROR
echo.Datestamp is %date%, %time% >> 7ZIP_MY_FOLDERS.log
echo.Archive test on %shortfolder% failed
echo.%shortfolder%.7z was just created but ARCHIVE TEST ERROR code is %error% | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
goto CONTINUE

:END
echo.| "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
echo.| "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
echo.FINISHED - REPORTED PROBLEMS IN LOG ARE THESE:| "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
echo.(PRESS SPACE FOR NEXT PAGE)
echo.| "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
echo.| "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log
find "ERROR"<7ZIP_MY_FOLDERS.log | "%scriptdir%/mtee.exe" /+ 7ZIP_MY_FOLDERS.log |more

FOR %%V IN (scriptdir folderdir folder shortfolder error) DO SET %%V=

(ECHO. 	------END------press any key to quit) & pause>nul

::	to do: what happens if its a fodler with just an empty folder or file in it. What happens if 7z is created but its 1kb


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
