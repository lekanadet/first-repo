# -*- coding: utf-8 -*-
"""
Created on Fri May 13 23:04:47 2022

@author: OLALEKAN
"""

elements = {"hydrogen": 1, "helium": 2, "carbon": 6}

print(elements)
print(elements)
print(elements['carbon'])

elements['carbon'] = 1000

elements['nitrogen'] = 88000

print(elements)

print('hydrogen' in elements)
print(elements.get('heliumm'))
#print(elements['Lithium'])    # it is better to use get as using square bracket to find keys that does not exists will crash our program
print("*****")
print(elements.get('oxygen',"Key not found"))
x = elements.get('oxygen',"Key not found")
not_null = x is not None # using identity operator is not

print(not_null)
print("*****")
print("*****")

a = [1, 2, 3]
b = a
c = [1, 2, 3]
b=c

print(a == b)
print(a is b) # identity operator takes eefect follwoing direct assigning of value of right to left it will return fals even though if both content are the same in as much the is no direct assigning between the two
print(a == c) # it does not fo;;er assignmemt once both content are the same it returns true
print(a is c)