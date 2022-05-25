# -*- coding: utf-8 -*-
"""
Created on Fri May 20 12:52:11 2022

@author: OLALEKAN
"""
try:
    f = open(r"C:\Users\OLALEKAN\Documents\encryption.txt","r")

    file_data = f.read()
    f.close()

    print(file_data)
    
except FileNotFoundError:
    print("File not found in this location")
    
    

