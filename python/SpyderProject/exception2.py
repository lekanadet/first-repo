# -*- coding: utf-8 -*-
"""
Created on Sat Apr 11 12:55:00 2020

@author: OLALEKAN
"""

try:  
    fileptr = open("file.txt","r")    
    try:  
        fileptr.write("Hi I am good")  
    finally:  
        fileptr.close()  
        print("file closed")  
except:  
    print("Error")
    
try:
    age = int(input("Enter age")) 
    if age < 18:
        raise ValueError
    else:
        print("Age is Valid")
except ValueError:
    print("Age is not valid")    
        