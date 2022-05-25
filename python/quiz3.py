# -*- coding: utf-8 -*-
"""
Created on Wed May 11 16:19:00 2022

@author: OLALEKAN
"""

full_name = "sebastian thrun Thomas"
print(full_name.title())

print(full_name.islower())

print(full_name.count("a"))
print(full_name.split(' ',2))
print("")


new_str = "The cow jumped over the moon."
str2 = "Peter Woods,  BBC Presenter (uncredited) (1 episode, 1974)"
print(new_str.split())

print(new_str.split()[0])

print(new_str.split(' ',2))

print(new_str.split(' ',1))

print(new_str.split(' ',3))

print(new_str.split('.',3))

print(new_str.split('cow'))

print(new_str.split(' '))

print(new_str.split(' ')[0])

print(str2.split())
print(str2.split(','))
print(str2.split(',')[0])