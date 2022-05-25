# -*- coding: utf-8 -*-
"""
Created on Sat Apr 11 18:18:19 2020

@author: OLALEKAN
"""

import re

str ="How is Everything. I Hope you are doing well"

matches = re.findall("Ho",str)
search = re.search("Ho",str)
print(matches)
print(search)
print(search.span())  
  
print(search.group())  
  
print(search.string)  

