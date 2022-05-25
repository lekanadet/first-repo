# -*- coding: utf-8 -*-
"""
Created on Sat Apr 11 03:08:22 2020

@author: OLALEKAN
"""

try:  
    a = int(input("Enter a:"))  
    b = int(input("Enter b:"))  
    c = a/b;  
    print("a/b = %d"%c)  
except ArithmeticError:  
    print("can't divide by zero")  
else:  
    print("Hi I am else block") 
    print("a/b = %d"%c)  

