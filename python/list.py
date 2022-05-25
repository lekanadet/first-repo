# -*- coding: utf-8 -*-
"""
Created on Thu May 12 19:39:13 2022

@author: OLALEKAN
"""

list_of_random_things = [1, 3.4, 'a string', True]

print(list_of_random_things)
print(list_of_random_things[2])
print(list_of_random_things[-1])
slice1 = list_of_random_things[0:2]
slice2 = list_of_random_things[:1]
slice3 = list_of_random_things[1:]
length = len(list_of_random_things)
print(slice1)
print(slice2)
print(slice3)
print(length)
print(1 in list_of_random_things)
print(3.5 not in list_of_random_things)

slice3[1] = 'String Update'

print(slice3)

eclipse_dates = ['June 21, 2001', 'December 4, 2002', 'November 23, 2003',
                 'March 29, 2006', 'August 1, 2008', 'July 22, 2009',
                 'July 11, 2010', 'November 13, 2012', 'March 20, 2015',
                 'March 9, 2016']
                 
                 
# TODO: Modify this line so it prints the last three elements of the list
print(eclipse_dates[7:])
print(eclipse_dates[-3:])

print(max(eclipse_dates))
print(eclipse_dates[2])
print(eclipse_dates[7])
print(eclipse_dates[2] > eclipse_dates[7])
print(eclipse_dates[8])
print(eclipse_dates[9])
print(eclipse_dates[8] > eclipse_dates[9])

print(' ')
ex = ['Jan','Feb','March','April','March','November']

print(max(ex))
print(min(ex))
print(sorted(ex))
print(ex[2] == ex[4])