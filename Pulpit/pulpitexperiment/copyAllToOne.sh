rm *.all.html;
rm *.json.all.*;
for folder in *; 
    do echo $folder; 
    for file in $folder/*;
        do echo $file;
        cat $file >> $folder.all.html;
    done;
    cat "writeScript.html" >> $folder.all.html; 
done;

mkdir -p activePages;
mv -f *.all.* activePages/;

