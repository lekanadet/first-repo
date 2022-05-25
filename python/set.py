# -*- coding: utf-8 -*-
"""
Created on Fri May 13 22:08:48 2022

@author: OLALEKAN
"""

l1 = [7,567,77,76,44,44,88,567]
set_l2 = {7,567,77,76,44,44,88,567}
set_l1 = set(l1)

print(l1[0])
# print(set_l2[0]) # sets are not ordered so cannot be indexed
print(set_l2)
print(l1)
print(set_l1)

l1.append(1000)  # list uses append to add new elements
set_l1.add(9000)  # set uses add to add new elements 

print(l1)
print(set_l1)

l1.remove(1000)
set_l1.pop()

print(l1)
print(set_l1)
print(9000 in set_l1)



