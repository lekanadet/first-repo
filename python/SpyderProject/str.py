# -*- coding: utf-8 -*-
str="HELLO"
print(str)  # the slice operator [] is use to access individual characters of the string
print(str[0:]) # the colon : is use to access the substring 
print(str[:2])

 # the figure before the colon indicated the index position and index stars from 0
# while the figure after the colon secifies the character position
print(str[1:3])

Integer = 10;  
Float = 1.290  
String = "Ayush"  
print("Hi I am Integer ... My value is %d\nHi I am float ... My value is %d\nHi I am string ... My value is %s"
      %(Integer,Float,String));  
      
Name = ["Adetutu","Olalekan",100,"Nigeria"]
Company = ["TPNL","Operations",10]
Management = ["Mr Doyin","Tunji Shoyemi"]
print()
print("printing employee information.....")
print("Name: %s, EmployeeID: %d, Country: %s"%(Name[0]+" "+Name[1],Name[2],Name[3]))
print("Company Name: %s, Department: %s, DepartmentID: %d"%(Company[0],Company[1],Company[2]))
print("MD/CEO: %s, HOD: %s"%(Management[0],Management[1]))
print()
for i in Name:
    print(i)
    
   
      