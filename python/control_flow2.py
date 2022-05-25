# -*- coding: utf-8 -*-
"""
Created on Tue May 17 14:21:41 2022

@author: OLALEKAN
"""
# combination of For loop and dictionary
book_title =  ['great', 'expectations','the', 'adventures', 'of', 'sherlock','holmes','the','great','gasby','hamlet','adventures','of','huckleberry','fin']

word_counter = {}

for word in book_title:
    if word not in word_counter:
        word_counter[word] = 1
    else:
        word_counter[word] += 1
        
print(word_counter)   

# using get() with dictionaries

word_counter2 = {}

for word in book_title:
    word_counter2[word] = word_counter2.get(word, 0) + 1     
    
print(word_counter2)   

#looping through a dictionary

cast = {
           "Jerry Seinfeld": "Jerry Seinfeld",
           "Julia Louis-Dreyfus": "Elaine Benes",
           "Jason Alexander": "George Costanza",
           "Michael Richards": "Cosmo Kramer"
       }

print(cast)
print(cast.items())

for i in cast:
    print(i)
    
for i,v in cast.items():
    print(v) 
     
    
    

 