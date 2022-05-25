# -*- coding: utf-8 -*-
"""
Created on Sat May 14 00:00:50 2022

@author: OLALEKAN
"""

animals = {'dogs': [20, 10, 15, 8, 32, 15], 'cats': [3,4,2,8,2,4], 'rabbits': [2, 3, 3], 'fish': [0.3, 0.5, 0.8, 0.3, 1], 7:["dog","cat"]}

print(animals)
print('')
print(animals['dogs'])
print('')
print(animals['dogs'][2])
print('')
print(animals['dogs'][2] + animals['fish'][2])

animals['rats'] = [22,11,33]

print(animals)

print("")
# invalid dictionary - this should break
room_numbers = {
    ('Freddie', 'Jen'): 403,
    ('Ned', 'Keith'): 391,
    ('Kristin', 'Jazzmyne'): 411,
    ('Eugene', 'Zach'): 395
}

print(room_numbers)
print(room_numbers['Freddie', 'Jen'])
print("------")
dic = {'east': 1, 'west': 2, 'south': 3, 'north': 4 }
print('east' in dic)
#nested dictionaries
print("------")
elements = {"hydrogen":
                       {'number': 1,
                        'weight': 0.0987,
                        'symbol': 'hy'}, 
            "helium": 
                       {'number': 8,
                        'weight': 1.012,
                        'symbol': 'he'}, 
            "carbon": 6}
    
print(elements['hydrogen']['number'])    
print(elements['helium']['number'])    

 # create a new oxygen dictionary 
elements["oxygen"] = {"number":8,"weight":15.999,"symbol":"O"}

print(elements)
print("")

elements['hydrogen']['is_noble_gas'] = False
elements['helium']['is_noble_gas'] = True
elements['oxygen']['is_noble_gas'] = False

print(elements)
print(elements['hydrogen'])
print(elements['helium']['is_noble_gas'])
