# -*- coding: utf-8 -*-
"""
Created on Mon May 16 14:06:12 2022

@author: OLALEKAN
"""
num = [1,2,3,4,5,6,7,5,7,88,9,6,3,4,5,4,3]
for i in num:
    double = i*2
    print(double)
print('\n')

cities = ['new york city', 'mountain view', 'chicago', 'los angeles']
for city in cities:
    print(city, '\n')
    print(city.title(), '\n')
print("Done!")

capitalized_cities = []

for city in cities:
    capitalized_cities.append(city.title())
print("Done")
print(cities)   
print(capitalized_cities) 

# range example

for i in range(1,6,2):
    print(i, 'Hello','\n')
    

# using range with the previous example
capitalized_cities_r = []
for index in range(len(cities)):
    cities[index] = cities[index].title()
    capitalized_cities_r.append(cities[index].title())
#print(cities[index])    
print(capitalized_cities_r)    
print(cities)   


sentence = ["the", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"]

for index in range(len(sentence)):
    print(sentence[index])
    
for i in range(5,31,5):
    print(i)
    
names = ["Joey Tribbiani", "Monica Geller", "Chandler Bing", "Phoebe Buffay"]
usernames = []

# write your for loop here
for index in range(len(names)):
    usernames.append(names[index].replace(' ', '_'))
    

print(usernames)    


items = ['first string', 'second string']
html_str = "<ul>\n"  # "\ n" is the character that marks the end of the line, it does
                     # the characters that are after it in html_str are on the next line

# write your code here
for i in range(len(items)):
    html_str +='<li> ' + str(items[i]) + ' </li>\n'
html_str += '</ul>' 

print(html_str)    
   

