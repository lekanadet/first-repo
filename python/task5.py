# -*- coding: utf-8 -*-
"""
Created on Wed May 18 15:50:29 2022

@author: OLALEKAN
"""

a = ["panama","rwanda","cameroun"]
 
c = ""

for i in a:
    c += i + " "
    if len(c)>= 9:
        c = c[:12]
        break
    

print(c)
print(c[:2])