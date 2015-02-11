@echo off

::	get the script directory for mtee - if we don't do this now shift will lose it.
::	the ~dp0 is explained at http://www.microsoft.com/resources/documentation/windows/xp/all/proddocs/en-us/percent.mspx?mfr=true

set scriptdir=%~dp0

::	first we setup a loop, so we process each command line parameter in turn, and goto done when there are no more files to process

:LOOP
::use me if probs
::echo %1
::pause

if (%1)==() goto end


::	then we get the folder name without quotes, since we need the 7z arguement to have quotes. this is what the tilde does.  
::	Set a short filename for the error log too
::	http://www.microsoft.com/resources/documentation/windows/xp/all/proddocs/en-us/percent.mspx?mfr=true

set folder=%~1
set shortfolder=%~n1

::	check for exisiting file

if exist "%folder%.7z" goto check

::	then we send 7zip the command to make an archive of the folder name, and crucially to add all /* files in the folder
::	without that you get the bloody folder inside the zip 
::	7zip didn't like .\ at the begginning of the latter. Removing it made this work

"C:\Program Files\7-Zip\7z.exe" a "%folder%.7z" -r "%folder%\*" 2<&1


:: 	Now test archive - note I've specified recursive testing of folders inside the archive,
::	and output error and stdout to screen and tee -don't think either make any difference

echo. Testing Archive %folder%.7z...
"C:\Program Files\7-Zip\7z.exe" t -r "%folder%.7z" 2<&1 | "%scriptdir%/mtee.exe" /t/+ 7zip%DATE:/=%.log

::	if it works echo that to screen and script, otherwise echo error. Good things on error levels if you IF /?

if "%errorlevel%"=="0" echo. %shortfolder%.7z ARCHIVED OK as error code is %errorlevel% | "%scriptdir%/mtee.exe" /t/+ 7zip%DATE:/=%.log /+ 7zipERRORS%DATE:/=%.log
if errorlevel 1 echo. %folder%.7z ARCHIVE ERROR as error code is %errorlevel% | "%scriptdir%/mtee.exe" /t/+ 7zip%DATE:/=%.log /+ 7zipERRORS%DATE:/=%.log
echo. ___________________________________________ >>7zip%DATE:/=%.log
echo. ____________________________________________>>7zip%DATE:/=%.log


:CONTINUE

::	then we shift the command line parameters up one, and loop back to the start
::	http://stackoverflow.com/questions/935609/batch-parameters-everything-after-1

shift
goto loop



:CHECK
echo. %shortfolder% already exists - checking...
"C:\Program Files\7-Zip\7z.exe" t "%folder%.7z" | "%scriptdir%/mtee.exe" /t/+ 7zip%DATE:/=%.log
if "%errorlevel%"=="0" echo. %shortfolder%.7z ALREADY EXISTS and appears vaild as error code is %errorlevel% | "%scriptdir%/mtee.exe" /t/+ 7zip%DATE:/=%.log /+ 7zipERRORS%DATE:/=%.log
if errorlevel 1 echo. %shortfolder%.7z ALREADY EXISTS AND APPEARS CORRUPT as error code is %errorlevel% | "%scriptdir%/mtee.exe" /t/+ 7zip%DATE:/=%.log /+ 7zipERRORS%DATE:/=%.log
goto continue

:END
echo. FINISHED
find "error" 7zip%DATE:/=%.log
pause


::	to do: remove
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
