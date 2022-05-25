# -*- coding: utf-8 -*-
"""
Created on Fri May 20 13:14:15 2022

@author: OLALEKAN
"""

files = []
f_open = open(r"C:\Users\OLALEKAN\Documents\test.txt","r")
f_content = f_open.read(5)
f_open.close() 
for i in range(50):
    files.append(f_content)

   

f2 = open(r"C:\Users\OLALEKAN\Documents\test2.txt","w")
for i in files:
    f2.write(i + ", ")

f2.close()  


file_result = []
with open(r"C:\Users\OLALEKAN\Documents\flying_circus_cast.txt") as f:
    for line in f:
        file_result.append(line.strip())

print(file_result)  
print(files)   

