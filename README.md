MOU MY FOLDERS- WINDOWS SEND-TO SCRIPTS
=======================================

What's this in the 7zip folder?
===============================

Now here's a common situation. If you work like me you would like to have this:

"THE HULK" = FOLDER

and in this folder:

THE HULK.BIN

THE HULK.CUE

THE HULK.WAV's/SCREENSHOTS/WHATEVER

So you've carefully crafted your HULK iso and you tell 7-zip to compress it. And what does it do, but make "THE HULK" = FOLDER and within this ANOTHER "THE HULK" folder with your files within that ('folder-in-zip' syndrome). WinRAR has an easy option to sort this out, not 7-zip

And my biggest bugbear: the whole reason you're trying to archive things in the first place is because you're running out of room. And all you want to do is archive to the SAME folder you have the original material in, and delete the originals sequentially (i.e.: more like a format converter). But does 7zip or any of these progs consistently make it easy for you to delete the archive sequentially? Either you find they try and delete all the old folders at the end of processing, or if they do sequential deletion you find you can't do that specific file-operation you want to do because of some other consideration - for instance folder-in-zip syndrome, or the fact that WinRAR can only make RAR's or Zips, and so on

Out of winzip, 7z, winRAR etc, none of them do quite the job you want them to do at the right time. You you end up fiddling around. QP has an archive function - I tested it this morning - seems to be able to unarchive ok, but when I tried to archive, something very wrong happened deep within QP.....

I decided the best way of sorting this out would be to have a right-click menu option in windows that would just do this, without fuss. Do some archive operation in the same folder the original files are in, and delete the original as you go. Is that too much to ask?

I also wanted to be able to go away while its doing it, and come back to some form of log that tells me how it got on with this, just incase I'm lucky enough to own loads of games I need to zip up. So, the idea is 1) Right click and select operation to be perfomed in a folder 2) go away 3) come back to eg: folders gone and 7zips in the original location, and 4) be told in a log exactly what happened to each file so I know 100% what happened

I went to the 7zip forums....found some good inspiration, but no-one who'd actually done what I wanted. So that's what we have here

Here are 5 different typical file operations you might want to do, done with 7zip. Of course the main worry here is we're doing file deletion with no way of recovery - so for each operation 7zip will take any opportunity it can to test archives, and I've built in everything I can think of and do to try and make sure nothing goes wrong. So this isn't the fastest way to deal with archival, but it means you can do something else whilst its doing it.

Now, interestingly, the windows send-to command only seems (after some testing) to be able to handle 140 items, so if you right-click after selecting 141 items, you're out of luck it won't do anything. So,if you're lucky enough to have more than 140 games to want to 7zip, you'll need to run multiple instances for unattended operation. So my script creates a separate log file for each of the instances that you can check when all is finished each log file (which you'll find in the folder you're working in) has a random number at the end precicely so you can run multiple instances of it without overwriting or confusion. Really not as complex as it sounds: just check the log files for any errors and frankly i've never had an error unless Iv'e done somthings stupid like tell it to make a pre-existing 7zip or tell it to unarchive a windows folder

The script requires a T-splitter program: thats a program that can write to screen and a file at the same time, because you can't otherwise do that with command line. So you need to make sure M-tee by Richie Lawrence is inlcuded in each script directory (its like 6kb, no big deal,just put the exe where the scripts are)

Again I'd recommend making a SCRIPTS directory in your emulators folder, or in the QP folder - and having these scripts in there somewhere. Then if you're on XP its a simple matter of putting the shortcuts into the send-to folder, and if you're on Win 7 its a matter of finding the send-to folder to drop the shortcuts into :)

What's this in the MOU folder?
===============================

Sometime after making the 7zip scripts, I changed my 7-zip CD/DVD images scripts to be for MOU/Winmount CD/DVD images instead. This means you can batch process mou files now - convert uncompressed stuff into mou format, convert zips and 7zips into .mou format and convert them back again. Then you can use my CD/DVD loader with QuickPlay to play them - the loader's here

What's Winmount?
================

Winmount uses .mou files as a compressed file format that doesn't need to be uncompressed to mount - it doesn't zip up as much as 7zip but it means you can load games without uncompressing them. I find this great because it means I can use the same images on my big pc and my little pc (without winmount i could use compressed images on my big pc but my little one took about 5 mins to uncompress them in order to mount them). But the basic thing is of course you save HD space

What's to think about?
======================

The idea with these scripts was to put them in windows 'send-to' folder so you can select and right click. To be frank I haven't bothered I just drag the files onto the script. Either way is good

7zip is a bit of a more refined program than winmount, unfortuately winmount can't check files for problems, so I had to take file checking out of these....haven't had any problems tho. But those operations that do use zipped files will still try to grab 7zip to do checking. So you'll need to have both Winmount and 7zip installed for this to work

Also unlike 7zip, I'm afraid Winmount isn't free....

How do I use this?
==================

Same as the '7zip my folders' post - all still applies but even more so to Winmount since there's no way to do batch mou operations in it natively. And yes - you still need to include the tiny splitter prog M-Tee by Richie Lawrence for this to work at all and put it in the scripts directory.....