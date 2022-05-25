# -*- coding: utf-8 -*-
"""
Created on Thu May 12 21:30:29 2022

@author: OLALEKAN
"""
empty_list = []
print(empty_list)
new_int = sorted([7,567,77,76,44])
new_int2 = new_int
#you cannot use join with integers only strings is possible
#new_int3 = "--".join([7,567,77,76,44])
print(new_int)
new_int.append(5600)
new_int[1] = 1000
print(new_int)
print(new_int2)
print("")

new_str = "\n".join(["fore", "aft", "starboard", "port"])
print(new_str)
print("")


new_str = "*".join(["fore", "aft", "starboard", "port"])
print(new_str)
print("")

new_mixed1 = sorted([7,567,77,76.9,44])
new_mixed2 = max([7,567,77,3476.9,44])
print(new_mixed1)
print(new_mixed2)
print("")
print(44 in new_mixed1)

new_mixed1.pop(2)
print(new_mixed1)

