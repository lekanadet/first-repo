# -*- coding: utf-8 -*-
"""
Created on Fri May 20 14:14:53 2022

@author: OLALEKAN
"""

def create_cast_list(filename):
    cast_list = []
    #use with to open the file filename
    with open(filename) as f:
        for line in f:
            cast_list.append(line.strip().split(',')[0])
    #use the for loop syntax to process each line
    #and add the actor name to cast_list
    
    return cast_list


cast_list = create_cast_list(r"C:\Users\OLALEKAN\Documents\flying_circus_cast.txt")
for i in cast_list:
    print(i)
    



   
    


    
    
        
    