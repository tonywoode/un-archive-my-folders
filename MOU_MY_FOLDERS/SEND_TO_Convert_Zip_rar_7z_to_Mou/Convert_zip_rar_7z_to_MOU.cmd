@echo off
SETLOCAL
echo.MOU_my_folders_check_and_delete.cmd


::	This script will convert a zip archive to an MOU one
::	Its intended to be put in a directory and a shortcut be made in Windows SendTo folder
::	This is intended to be used in a static folder - no files which could be updated while the script is running
::	Mtee.exe needs to downloaded and put in the script directory http://commandline.co.uk/mtee/index.html 

::	get the script directory for mtee and folder dir - if we don't do this now shift will lose it. Set directory to folders dir
::	the ~dp0 is explained at http://www.microsoft.com/resources/documentation/windows/xp/all/proddocs/en-us/percent.mspx?mfr=true

set scriptdir=%~dp0
set folderdir=%~dp1
cd /d %~dp1
set log="%folderdir%CONVERT_MY_FOLDERS_zip_to_Mou%RANDOM%.log"
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
if (%~x1)==(.MOU) goto MOUALREADY
if exist %zipfile%.MOU goto MOUEXISTS
if (%~x1)==(.zip) goto TESTZIP
if (%~x1)==(.rar) goto TESTZIP
if (%~x1)==(.7z) goto TESTZIP
GOTO fail

:FINE
:: make a temp folder directory. Use shortname incase zip name is long
:: didn't need all the 7zip stuff as winmount can convert in one step

"C:\Program Files\Winmount\winmount.exe" -T %1 2<&1

::	Check that the archiving went ok. Otherwise report

set error=%errorlevel%
if %error% NEQ 0 goto CREATEERROR


:: 	Now we could test archive, but winmount can't

echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.Made MOU Archive %shortzip%.MOU and Winmount can't test archives dammit, but at least it deletes the zip... | "%scriptdir%/mtee.exe" /+ %log%
echo.>>%log%
echo.>>%log%
:CONTINUE
echo.____________________________________________>>%log%
echo.____________________________________________>>%log%

::	then we shift the command line parameters up one, and loop back to the start
::	http://stackoverflow.com/questions/935609/batch-parameters-everything-after-1

shift
goto LOOP



:MOUEXISTS
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.%shortzip%.MOU already exists - I'd check it if I could but I can't... | "%scriptdir%/mtee.exe" /+ %log%
echo.%shortzip%.MOU ERROR ALREADY EXISTS, MIGHT BE OKAY, MIGHT NOT :not processing | "%scriptdir%/mtee.exe" /+ %log%
goto CONTINUE


:ITSAFOLDER
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.%shortzip% is a folder, not processing | "%scriptdir%/mtee.exe" /+ %log%
echo.%shortzip% ERROR as its a folder | "%scriptdir%/mtee.exe" /+ %log%
goto CONTINUE

:MOUALREADY
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.%shortzip% is an MOU file already - I'd check it if I could, but I can't... | "%scriptdir%/mtee.exe" /+ %log%
echo.%shortzip% is ALREADY an MOU, MIGHT BE OKAY, MIGHT NOT. ERROR THERE SOMEWHERE | "%scriptdir%/mtee.exe" /+ %log%
:: also check it isn't a 1kb file
if %~z1 LEQ 32 echo.%shortzip% ADDITIONAL ERROR - LESS THAN 1KB IN SIZE  | "%scriptdir%/mtee.exe" /+ %log%
goto CONTINUE

:TESTZIP
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.%shortzip% is a Zip file - checking... | "%scriptdir%/mtee.exe" /+ %log%
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
echo.Couldn't create the MOU for %shortzip%, and I don't know why| "%scriptdir%/mtee.exe" /+ %log%
echo.%shortzip%.MOU ARCHIVE CREATE ERROR code is %error% | "%scriptdir%/mtee.exe" /+ %log%
goto CONTINUE

:FAIL
echo.Datestamp is %date%, %time% ^& Current directory is %cd% >> %log%
echo.%shortzip% - I don't know what type of file this is, its not a zip
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

::	to do: what happens if its a folder with just an empty folder or file in it. What happens if 7z is created but its 1kb

::WINMOUNT COMMAND LINE OPTIONS - SEP 11
::1. Mount compressed file(s) or folder(s)
::
::Command: winmount -m [file path] [-drv:disk letter or path] [-NoWriteback:] [-attach:]
::
::Introduction:
::-drv: mount files to disk or path (Not necessary)
::-NoWriteback: read only (Not necessary)
::-attach: mount using filter drive. Filter drive meas mounting to an exist path.
::[file path] can be quoted with whole path, relative path or default 
::
::Examples:
::
::1) mount compressed file
::winmount -m "E:\test.mou" -drv:Z:\abc
::
::2) mount folder
::winmount -m "E:\test" -drv:Z:\abc
::
::3) mount muti files or folders (seperate paths with space)
::winmount -m "E:\test.mou" "E:\test.rar" "E:\test.zip" -drv:Z:\abc
::
::Appropriate for *.mou,*.rar,*.zip or folder
::
::2. Mount CD/DVD file(s)
::
::Command: winmount -m [file path] [-drv:disk] [-NoWriteback:] [-attach:]
::
::Example: winmount -m "E:\test.iso" -drv:Z:\abc 
::
::Appropriate for *.iso, *.bin, *.cue, *.ccd, *.mds, *.mdf, *.nrg,, *.img, *.isz, *.ape, *.flac, *.wv
::Also appropriate for *.wim, *.wmt
::
::3. Mount muti partition file(s)
::
::Command: winmount -m HDD_file [-drv:disk] [-Part:partition number(0,1...)] [-NoWriteback:]
::
::Introduction: -Part:partion number,0 is the first partition, 1 is the second partition
::
::Example: winmount -m Win2003.vhd -part:2 
::
::Appropriate for *.vhd, *.vdi, *.vmdk
::
::4. Mount new blank disk
::
::Command: winmount -drv:X -sectors: disk size
::
::0x400000=2G, 0x200000=1G
::
::Example: winmount -drv:X -sectors:0x400000
::
::5. Quick mount
::
::Command: winmount -M [file path] -attach: -drv:disk
::
::Example: winmount -M E:\test.mou -attach: -drv:E
::
::
::6. unmount
::
::1) unmount the assigned disk
::winmount -unmount:X
::
::2) unmount all disks
::winmount -unmountall
::
::7. Compression
::
::Command: winmount -C [file list] [-o:target file]
::
::Introduction:
::-o:assign the target file, can be whole path, relative path or default.
::
::Example: winmount -C "E:\test" "E:\test.txt" -o:E:\test.zip
::
::Appropriate for *.mou, *.zip, *. 7z
::
::8. Decompression
::
::Command: winmount -E [compressed file list] [-o:target folder]
::
::Example:winmount -E "E:\test.zip" "E:\test.mou" -o:E:\
::
::Appropriate for *.mou, *.zip, *.rar, *.7z
::
::9. Smart-extraction
::
::Command: winmount -E [compressed file list] "-s:target folder"
::
::Example: winmount -E "E:\test.zip" "E:\test.mou" “-s:E:\test”
::
::10. Convert
::
::Command: winmount -T [compressed file]
::
::Example: winmount -T E:\test.rar
::
::Appropriate for *.rar, *.zip, *.7z
::
::11. WinMount help
::
::Command: winmount -h




