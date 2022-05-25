# -*- coding: utf-8 -*-
"""
Created on Wed May 18 22:06:15 2022

@author: OLALEKAN
"""
cities = ["Lagos","Moscow","London","New York"]

capitalized_cities = []
for city in cities:
    if len(city) >= 6:
        capitalized_cities.append(city.title())
    

print(capitalized_cities)    
# the above can be reduce to the below using list comprehension

capitalized_cities2 = [city.title() for city in cities if len(city) >= 6]
print(capitalized_cities2)   


# more list comprehension examples 
# print squares of even numbers between 0 and 8
squares = [x**2 for x in range(9) if x % 2 == 0] 

print(squares)

# to use else or add else to the condition you have to rearrange the expression

squares2 = [x**2 if x % 2 == 0 else x**3 for x in range(9)]

print(squares2)