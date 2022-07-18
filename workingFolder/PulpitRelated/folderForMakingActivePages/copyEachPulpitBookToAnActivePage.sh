#INPUT
#The contents of openbible.com pulpit folder should be present in the current folder
#along with scriptToAddForPulpitActivePages.html and this file.
#
#PROCESSING
#A folder called activePages is created which will contain 1 html file for each book.
#The script is added to each html file
#
#OUTPUT
#66 active pages
#
#When one of these active pages is opened
#the html file will read itself, convert to JSON format and prompt to save.
#Note: the file that is saved will not contain the leading { of the JSON,
#   and will contain a , at then end.  If using as a standalone file,
#   place the { at the beginning, remove the last , and place } at the end.
#
#For making one large pulpit.json file, the files are all supposed to be concatenated.
#So go to the activePages folder, make sure there are just 66 files (remove the scriptToAddForPulpitActivePages.add.html and the copyEachPulpitBooktToAnActivePage.sh.all.html/mit
#as necessar) and use cat * > pulpit.json, then add { remove last , and add }. 


rm *.all.html;
rm *.json.all.*;
for folder in *; 
    do echo $folder; 
    for file in $folder/*;
        do echo $file;
        cat $file >> $folder.all.html;
    done;
    cat "scriptToAddForPulpitActivePages.html" >> $folder.all.html; 
done;

mkdir -p activePages;
mv -f *.all.* activePages/;

