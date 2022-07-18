import osisReferencesArray
osisArray = osisReferencesArray.osisReferencesArray
import nameConvert
bigNameToSmall=nameConvert.nameDictionaryBigToSmall

#print(osisArray)

# outfile=open("nameConvert.py","w")
# outfile.write("nameConvert={")
# lastName=""
# for ref in osisArray:
#     pass
#     myArr=ref.split(".")
#     name = myArr[0]
#     if name!=lastName:
#         print(name)
#         lastName=name
#         outfile.write("\""+name+"\""+":"+"\"\",\n")
# outfile.write("}")
# outfile.close()            


infile=open("all.txt","r")
lines = infile.readlines()
infile.close()
outfile= open("bandc_initial.txt", "w")
for line in lines:
    mystring=line
    someString=mystring
    if "BOOKANDCHAPTER" in line:
        mystring=line.replace("◄ ","")
        mystring=mystring.replace(" ►","")
        #print(mystring)
        
        for name in bigNameToSmall:
            #print(name)
            #print(bigNameToSmall[name])
            mystring = mystring.replace(name,bigNameToSmall[name])
            myArr = mystring.split(" ")
            someString = str(myArr[0]+"."+myArr[1])
            print(someString)
            #print(myArr[0]+"."+myArr[1])
            #mystring = myArr[0]+myArr[1]
        
    outfile.write(someString)
outfile.close()
    