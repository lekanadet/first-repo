# -*- coding: utf-8 -*-
"""
Created on Wed May 18 21:20:43 2022

@author: OLALEKAN
"""

letters = ['a', 'b', 'c']
nums = [1, 2, 3]

for letter,num in zip(letters,nums):
    print("{} {}".format(letter,num))

print(list(zip(letters,nums)))

#method 2

for i,j in zip(letters,nums):
    print(i,j)

list= [('a', 1), ('b', 2), ('c', 3)]

letter, num = zip(*list)
print("{} {}".format(letter,num))

#task

x_coord = [23, 53, 2, -12, 95, 103, 14, -5]
y_coord = [677, 233, 405, 433, 905, 376, 432, 445]
z_coord = [4, 16, -6, -42, 3, -6, 23, -1]
labels = ["F", "J", "A", "Q", "Y", "B", "W", "X"]

points = []

for x,y,z,l in zip(x_coord,y_coord,z_coord,labels):
    #print("{}: {},{},{}".format(l,x,y,z))
    points.append("{}: {},{},{}".format(l,x,y,z))
# write your for loop here

print(points)

for point in points:
    print(point)
    