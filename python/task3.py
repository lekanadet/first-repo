# -*- coding: utf-8 -*-
"""
Created on Tue May 17 15:31:18 2022

@author: OLALEKAN
"""

# You would like to count the number of fruits in your basket. 
# In order to do this, you have the following dictionary and list of
# fruits.  Use the dictionary and list to count the total number
# of fruits, but you do not want to count the other items in your basket.

in_fruits = 0
not_in_fruits = 0
basket_items = {'apples': 4, 'oranges': 19, 'kites': 3, 'sandwiches': 8, 'bananas': 17}
fruits = ['apples', 'oranges', 'pears', 'peaches', 'grapes', 'bananas']

#Iterate through the dictionary
for i,v in basket_items.items():
    if i in fruits:
        in_fruits += v
    else:
       not_in_fruits += v    
        
    

#if the key is in the list of fruits, add the value (number of fruits) to result


print(in_fruits)
print(not_in_fruits)