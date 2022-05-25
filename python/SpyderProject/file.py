import os;
filetr = open(r"C:\Users\OLALEKAN\Documents\example3.txt","r")

if filetr:
    print("Opened successfylly")
    
content = filetr.read(35)
content2 = filetr.readline()
content3 = filetr.readline()
print(content)
print(content2)
print(content3)
filetr.close()   

filetr = open(r"C:\Users\OLALEKAN\Documents\file.txt","a")
filetr.write("Python is the modern day language. It makes things so simple.")
print(end=' ')
filetr.close()   

filetr2 = open(r"C:\Users\OLALEKAN\Documents\file.txt2","w")

if filetr2:
    print("File created successfully")
 
filetr2 = open(r"C:\Users\OLALEKAN\Documents\file.txt2","w+")
filetr2.write("Data is the new Oil and python is the access to Data")
content4 = filetr2.read()
print(content4)   
filetr2.close()

with open(r"C:\Users\OLALEKAN\Documents\file.txt3","a") as f1:
    f1.write("Using with statement with open")
    f1.close()
    
with open(r"C:\Users\OLALEKAN\Documents\file.txt3","r") as f2: 
    print(f2.tell)
    print(f2.read())
    print(f2.tell)

os.rename("C:/Users/OLALEKAN\Documents/example3.txt","C:/Users/OLALEKAN/Documents/example4.txt")
os.remove("C:/Users/OLALEKAN/Documents/file.txt3")
os.mkdir("C:/Users/OLALEKAN/Documents/Python codes examples")
print(os.getcwd())