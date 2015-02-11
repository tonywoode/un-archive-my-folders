@echo off
SETLOCAL
echo.Extract_my_zips_with_Winmount_and_delete.cmd


::	This script will unzip folder archives with Winmount, then delete the archives as it goes along
::	Its intended to be put in a directory and a shortcut be made in Windows SendTo folder
::	This is intended to be used in a static folder - no files which could be updated while the script is running
::	Mtee.exe needs to downloaded and put in the script directory http://commandline.co.uk/mtee/index.html 

::	get the script directory for mtee and folder dir - if we don't do this now shift will lose it. Set directory to folders dir
::	the ~dp0 is explained at http://www.microsoft.com/resources/documentation/windows/xp/all/proddocs/en-us/percent.mspx?mfr=true

set scriptdir=%~dp0
set folderdir=%~dp1
cd /d %~dp1
set log="%folderdir%Extract_my_zips_with_Winmount_and_delete%RANDOM%.log"
if exist %log% echo.Log file %log% ERROR already exists, contents will go to end of file | "%scriptdir%/mtee.exe" /+ %log%
echo.LOGFILE is %log%

::	first we setup a loop, so we process each command line parameter in turn, and goto done when there are no more files to process

:LOOP

if (%1)==() goto END

::	get filename name without quotes, Set a short filename for the error log - filename with extension
set zipfile="%~dpn1"
set shortzip="%~n1"
echo.____________________________________________
echo.____________________________________________


:: check for folder, existing file, and file is a folder
:: check for existence of a folder first. Reason for this is that if the folder has a dot in the filename it crashes out the %~x1 checks
:: i guess that mean if a file has no extension and has a dot somewhere else you'd have problems....
if exist %1\ goto ITSAFOLDER

:CARRYON
if (%~x1)==(.mou) echo.OK %Shortzip% is a Winmount MOU file, so I can't check it - let's just do it - | "%scriptdir%/mtee.exe" /+ %log%
if (%~x1)==(.mou) goto FINE
if (%~x1)==(.zip) goto TESTZIP
if (%~x1)==(.7z) goto TESTZIP
if (%~x1)==(.rar) goto TESTZIP
GOTO fail

:FINE
:: set folder directory, providing it doesn't already exist
SET dir=%~dpn1\
If exist "%dir%" goto CREATEERROR

:: Winmount uncompresses image files and names its folder in rom dir after archive file 
:: nb: using the -s: option as I think this will extract with subdirs intact rather than the e option which might put all files in one dir
:: also note where winmount needs the ""'s in the S option - quite odd
:: lastly winmount always like to create folder in zip sindrome so the output has to be folderdir
"C:\Program Files\WinMount\WinMount.exe" -E %1 "-s:%folderdir%"
set error=%errorlevel%
if %error% NEQ 0 goto CREATEERROR

echo.>>%log%
echo.>>%log%
echo.ARCHIVE CHECKED OK, AND WINMOUNT POSSIBLY REPORTED NO UNPACKING PROBLEMS - DELETING SOURCE ARCHIVE | "%scriptdir%/mtee.exe" /+ %log%
del %1 2>&1
set error=%errorlevel%
if %error% EQU 0 echo.The archive file %shortzip% DELETED from %folderdir% as unarchiving reports OK | "%scriptdir%/mtee.exe" /+ %log%
if %error% NEQ 0 echo.ERROR removing archive %shortzip% from %folderdir% | "%scriptdir%/mtee.exe" /+ %log%


:CONTINUE
echo.____________________________________________>>%log%
echo.____________________________________________>>%log%

::	then we shift the command line parameters up one, and loop back to the start
::	http://stackoverflow.com/questions/935609/batch-parameters-everything-after-1

shift
goto LOOP



:ITSAFOLDER
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.%shortzip% is a folder - not processing | "%scriptdir%/mtee.exe" /+ %log%
echo.%shortzip% ERROR as its a folder | "%scriptdir%/mtee.exe" /+ %log%
goto CONTINUE


:TESTZIP
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.%shortzip% is an archive 7zip can check  - checking... | "%scriptdir%/mtee.exe" /+ %log%
:: also check it isn't a 1kb file
if %~z1 LEQ 32 echo.%shortfolder% ADDITIONAL ERROR - LESS THAN 1KB IN SIZE  | "%scriptdir%/mtee.exe" /+ %log%
"C:\Program Files\7-Zip\7z.exe" t %1 >>%log% 2>&1
set error=%errorlevel%
if %error% EQU 0 echo.%shortzip% is a Zip File and appears ok EXIT code is %error% :proceeding!| "%scriptdir%/mtee.exe" /+ %log%
if %error% NEQ 0 goto ZIPERROR
goto FINE
:ZIPERROR
echo.%shortzip% is a Zip File but APPEARS CORRUPT ERROR code is %error% :not processing | "%scriptdir%/mtee.exe" /+ %log%
goto CONTINUE

:CREATEERROR
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.Couldn't create the folder for %shortzip%, or %dir% already exists so I don't want to mess with it | "%scriptdir%/mtee.exe" /+ %log%
if %error% NEQ 0 echo.%shortzip% UNARCHIVE CREATE FOLDER ERROR code is %error%| "%scriptdir%/mtee.exe" /+ %log%
if %error% EQU 0 echo.%shortzip% EXISTING FOLDER ERROR - FOLDER EXISTS| "%scriptdir%/mtee.exe" /+ %log%
goto CONTINUE

:FAIL
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.%shortzip% - I don't know what type of file this is, its not an archive I can manage
echo.%shortzip% ERROR - couldn't determine what this file is | "%scriptdir%/mtee.exe" /+ %log%
goto CONTINUE

:END
echo.| "%scriptdir%/mtee.exe" /+ %log%
echo.| "%scriptdir%/mtee.exe" /+ %log%
echo.FINISHED - REPORTED PROBLEMS IN LOG ARE THESE:| "%scriptdir%/mtee.exe" /+ %log%
echo.(PRESS SPACE FOR NEXT PAGE)
echo.| "%scriptdir%/mtee.exe" /+ %log%
echo.| "%scriptdir%/mtee.exe" /+ %log%
find "ERROR"<%log% | "%scriptdir%/mtee.exe" /+ %log% |more
echo.| "%scriptdir%/mtee.exe" /+ %log%
echo.| "%scriptdir%/mtee.exe" /+ %log%
echo.REMOVED STUFF ARE THESE:| "%scriptdir%/mtee.exe" /+ %log%
echo.(PRESS SPACE FOR NEXT PAGE)
echo.| "%scriptdir%/mtee.exe" /+ %log%
echo.| "%scriptdir%/mtee.exe" /+ %log%
find "DELETED"<%log% | "%scriptdir%/mtee.exe" /+ %log% |more
echo.

::	clear up
FOR %%V IN (scriptdir folderdir folder dir shortfolder error log) DO SET %%V=

(ECHO. 	------END------press any key to quit) & pause>nul

::	to do: what happens if its a folder with just an empty folder or file in it. What happens if 7z is created but its 1kb



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
