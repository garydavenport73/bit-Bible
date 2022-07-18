
def getBookAndChapterIndex(startIndex,lines):
    for i in range(startIndex, 0, -1):
        if "BOOKANDCHAPTER" in lines[i]:
            return i
    return -1

def getVerseIndex(startIndex,lines):
    for i in range(startIndex,len(lines)-1,1):
        if "VERSENUMBER" in lines[i]:
            return i
    return -1

infile = open("bandc_initial.txt","r")
lines = infile.readlines()
infile.close()

outfile = open("paragraphEndLocations.json","w")
outfile.write("{\n")
for i in range(len(lines)-1):
    lines[i] = lines[i].strip()
    #if the line contains a verse number, but the following does not
    #it is the end of the paragraph
    
    if (("VERSENUMBER" in lines[i]) or ("PARAGRAPHSTARTS") in lines[i]) and not("VERSENUMBER" in lines[i+1]):
        
        bookAndChapterIndex=getBookAndChapterIndex(i,lines)
        bookAndChapter=lines[bookAndChapterIndex].replace("BOOKANDCHAPTER","")
        
        verseNumber = lines[i].replace("VERSENUMBER","").strip()
        
        print("paragraph ends at line",i+1) #this is the line in the text file read in 1 based
    
        print("\""+bookAndChapter+"."+verseNumber+"\":\"PARAGRAPHENDS\"")
        outfile.write("\""+bookAndChapter+"."+verseNumber+"\":\"PARAGRAPHENDS\",\n")
        

    
   
outfile.close()

infile=open("paragraphEndLocations.json","r")
content = infile.read();
infile.close()

content=content.strip()
content = content[:-1]
content = content + "\n}"

outfile=open("paragraphEndLocations.json","w")
outfile.write(content)
outfile.close()

