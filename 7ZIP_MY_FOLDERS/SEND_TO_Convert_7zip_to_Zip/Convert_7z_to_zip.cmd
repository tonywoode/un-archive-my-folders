@echo off
SETLOCAL
echo.convert 7z_to_zip_check_and_delete.cmd


::	This script will convert a 7zip archive to a zip one
::	It does that by unarchiving the source, making a new zip, checking it, then deleting the source 7zip
::	Its intended to be put in a directory and a shortcut be made in Windows SendTo folder
::	This is intended to be used in a static folder - no files which could be updated while the script is running
::	Mtee.exe needs to downloaded and put in the script directory http://commandline.co.uk/mtee/index.html 

::	get the script directory for mtee and folder dir - if we don't do this now shift will lose it. Set directory to folders dir
::	the ~dp0 is explained at http://www.microsoft.com/resources/documentation/windows/xp/all/proddocs/en-us/percent.mspx?mfr=true

set scriptdir=%~dp0
set folderdir=%~dp1
cd /d %~dp1
set log="%folderdir%CONVERT_MY_FOLDERS_7z_to_zip%RANDOM%.log"
if exist %log% echo.Log file %log% ERROR already exists, contents will go to end of file | "%scriptdir%/mtee.exe" /+ %log%
echo.LOGFILE is %log%

::	first we setup a loop, so we process each command line parameter in turn, and goto done when there are no more files to process

:LOOP

if (%1)==() goto END

::	get filename name without quotes, Set a short filename for the error log - filename with extension
set zipfile="%~dpn1"
set shortzip="%~nx1"
echo.____________________________________________
echo.____________________________________________


:: check for folder, existing file, and file is a folder
:: check for existence of a folder first. Reason for this is that if the folder has a dot in the filename it crashes out the %~x1 checks
:: i guess that mean if a file has no extension and has a dot somewhere else you'd have problems....
if exist %1\ goto ITSAFOLDER
if (%~x1)==(.zip) goto ZIPALREADY
if not (%~x1)==(.7z) goto NOTA7ZIP
if exist %zipfile%.zip goto ZIPEXISTS
if (%~x1)==(.7z) goto TEST7ZIP
GOTO fail

:FINE
:: make a temp folder directory. Use shortname incase zip name is long
SET tempdir="%~dpns1\"
If exist %tempdir%\ goto CREATEERROR

:: 7zip uncompresses image files and names its folder in rom dir after archive file 
:: nb: using the x option as this will extract with subdirs intact rather than the e option which will put all files in one dir
"C:\Program Files\7-Zip\7z.exe" x %1 -o%tempdir%
set error=%errorlevel%
if %error% NEQ 0 goto CREATEERROR


::	then have 7zip make archive of the folder name, and add all \* files in the folder to it. This prevents 'folder in zip' syndrome 
::	7zip didn't like .\ at the begginning of the latter. Removing it made this work

"C:\Program Files\7-Zip\7z.exe" a %zipfile%.zip %tempdir%\* 2<&1

::	Check that the archiving went ok. Otherwise report

set error=%errorlevel%
if %error% NEQ 0 goto CREATEERROR


:: 	Now test archive - note I've specified recursive testing of folders inside the archive,
::	and output error and stdout to log -don't think either make any difference

echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.Made Zip Archive %shortzip:~0,-5%".zip now testing archive... | "%scriptdir%/mtee.exe" /+ %log%
"C:\Program Files\7-Zip\7z.exe" t -r %zipfile%.zip >>%log% 2>&1
set error=%errorlevel%
if %error% EQU 0 echo.%shortzip:~0,-5%".zip CREATED AND TESTED - all OK | "%scriptdir%/mtee.exe" /+ %log%
if %error% NEQ 0 goto TESTERROR

echo.>>%log%
echo.>>%log%
echo.ARCHIVE ZIP CHECKS OK - DELETING SOURCE 7ZIP | "%scriptdir%/mtee.exe" /+ %log%
del %1 2>&1
set error=%errorlevel%
if %error% EQU 0 echo.%shortzip% DELETED from %folderdir% AS zip TESTED OK | "%scriptdir%/mtee.exe" /+ %log%
if %error% NEQ 0 echo.ERROR removing 7zip %shortzip% from %folderdir% | "%scriptdir%/mtee.exe" /+ %log%

echo.DELETING TEMP FOLDER | "%scriptdir%/mtee.exe" /+ %log%
rd /s /q %tempdir% 2>&1
set error=%errorlevel%
if %error% EQU 0 echo.temp folder %tempdir% DELETED from %folderdir% AS 7z TESTED OK | "%scriptdir%/mtee.exe" /+ %log%
if %error% NEQ 0 echo.ERROR removing temp folder %tempdir% from %folderdir% | "%scriptdir%/mtee.exe" /+ %log%



:CONTINUE
echo.____________________________________________>>%log%
echo.____________________________________________>>%log%

::	then we shift the command line parameters up one, and loop back to the start
::	http://stackoverflow.com/questions/935609/batch-parameters-everything-after-1

shift
goto LOOP

:NOTA7ZIP
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.%shortzip% is not a 7zip file or doesn't exist | "%scriptdir%/mtee.exe" /+ %log%
echo.%shortzip% ------------------ERROR not a 7zip or doesn't exist | "%scriptdir%/mtee.exe" /+ %log%
::	also check whether a zip exists already with the empty folders name
if exist %shortzip%.zip echo.zip also already exists for not a 7zip file %shortzip%  | "%scriptdir%/mtee.exe" /+ %log%
if exist %shortzip%.zip goto ZIPEXISTS
goto CONTINUE


:ZIPEXISTS
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.%shortzip:~0,-4%".zip already exists - checking... | "%scriptdir%/mtee.exe" /+ %log%
"C:\Program Files\7-Zip\7z.exe" t %zipfile%.zip >>%log% 2>&1
set error=%errorlevel%
if %error% EQU 0 echo.%shortzip:~0,-4%".zip ERROR ALREADY EXISTS and appears valid ERROR code is %error% :not processing | "%scriptdir%/mtee.exe" /+ %log%
if %error% NEQ 0 echo.%shortzip:~0,-4%".zip ERROR ALREADY EXISTS and APPEARS CORRUPT ERROR code is %error% : not processing| "%scriptdir%/mtee.exe" /+ %log%
goto CONTINUE


:ITSAFOLDER
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.%shortzip% is a folder, not processing | "%scriptdir%/mtee.exe" /+ %log%
echo.%shortzip% ERROR as its a folder | "%scriptdir%/mtee.exe" /+ %log%
goto CONTINUE

:ZIPALREADY
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.%shortzip% is a zip file already - checking... | "%scriptdir%/mtee.exe" /+ %log%
"C:\Program Files\7-Zip\7z.exe" t %1 >>%log% 2>&1
set error=%errorlevel%
if %error% EQU 0 echo.%shortzip% is ALREADY a Zip and appears ok ERROR code is %error% | "%scriptdir%/mtee.exe" /+ %log%
if %error% NEQ 0 echo.%shortzip% is ALREADY a Zip and APPEARS CORRUPT ERROR code is %error% | "%scriptdir%/mtee.exe" /+ %log%
:: also check it isn't a 1kb file
if %~z1 LEQ 32 echo.%shortzip% ADDITIONAL ERROR - LESS THAN 1KB IN SIZE  | "%scriptdir%/mtee.exe" /+ %log%
goto CONTINUE

:TEST7ZIP
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.%shortzip% is a 7Zip file - checking... | "%scriptdir%/mtee.exe" /+ %log%
:: also check it isn't a 1kb file
if %~z1 LEQ 32 echo.%shortfolder% ADDITIONAL ERROR - LESS THAN 1KB IN SIZE  | "%scriptdir%/mtee.exe" /+ %log%
"C:\Program Files\7-Zip\7z.exe" t %1 >>%log% 2>&1
set error=%errorlevel%
if %error% EQU 0 echo.%shortzip% is a 7Zip File and appears ok EXIT code is %error% :proceeding!| "%scriptdir%/mtee.exe" /+ %log%
if %error% NEQ 0 goto ZIPERROR
goto FINE
:ZIPERROR
echo.%shortzip% is a 7Zip File but APPEARS CORRUPT ERROR code is %error% :not processing | "%scriptdir%/mtee.exe" /+ %log%
goto CONTINUE

:CREATEERROR
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.Either couldn't create the temp folder, or the zip, for %shortzip%, or %tempdir% (or the long-name equivalent) aready exists so I don't want to mess with it | "%scriptdir%/mtee.exe" /+ %log%
echo.%shortzip:~0,-4%".zip ARCHIVE CREATE ERROR code is %error% | "%scriptdir%/mtee.exe" /+ %log%
goto CONTINUE

:TESTERROR
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.Archive test on %shortzip% failed
echo.%shortzip%.zip was just created but ARCHIVE TEST ERROR code is %error% | "%scriptdir%/mtee.exe" /+ %log%
goto CONTINUE

:FAIL
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.%shortzip% - I don't know what type of file this is, its not a 7zip
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
FOR %%V IN (scriptdir folderdir folder tempdir shortfolder error log) DO SET %%V=

(ECHO. 	------END------press any key to quit) & pause>nul

::	to do: what happens if its a folder with just an empty folder or file in it. What happens if zip is created but its 1kb



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
