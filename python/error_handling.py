# -*- coding: utf-8 -*-
"""
Created on Thu May 19 22:58:11 2022

@author: OLALEKAN
"""

while True:
    try:
        a = float(input("Enter a number here: "))
        print(a)
        break
    except:
        print("Invalid number")
        
        
while True:
    try:
        a = input("Enter your name: ")
        print("My name is " / a)
        break
    except ValueError:
        print("Invalid string")
    except KeyboardInterrupt:
        print("\n User Initiated termination")  
        break
    except TypeError:
        print("You cannot use operands ment for intergers with String") 
        
        
        
try:
    a = int(input("Enter new number here: "))
    print(2*a)
except:
    print("Invalid Number")
    
        




              
    

    
    
    


