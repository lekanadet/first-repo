# -*- coding: utf-8 -*-
"""
Created on Wed May 18 23:07:40 2022

@author: OLALEKAN
"""

def addtolist():
    t = int(input("Enter the size of the list"))
    z=[]
    for i in range(0,t):
        z.append(i)
    return z
    
print(addtolist())   


def cylinder_volume(height, radius):
    pi = 3.14159
    return height * pi * radius ** 2  

print(cylinder_volume(10.5, 8))
# using default values in function

def cylinder_volume2(height, radius=5):
    pi = 3.14159
    return height * pi * radius ** 2

print(cylinder_volume2(6))
print(cylinder_volume2(6, 5))


# using lambda functions

def multiply1(x, y):
    return x * y

multiply2 = lambda x,y: x*y

print(multiply1(2, 3))
print(multiply2(2, 3))

