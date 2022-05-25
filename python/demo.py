# -*- coding: utf-8 -*-:
"""
Created on Fri May 20 21:14:11 2022

@author: OLALEKAN
"""

# demo.py

import useful_functions as uf #import local modules
import math as m # import math function which is part of python standard library
import os

a = 4
print(m.factorial(a))
scores = [88, 92, 79, 93, 85]
scores_factorial =[]

mean = uf.mean(scores)
curved = uf.add_five(scores)

mean_c = uf.mean(curved)

for i in scores:
    scores_factorial.append(m.factorial(i))

print("Scores:", scores)
print("Original Mean:", mean, " New Mean:", mean_c)
print("Factorial of Scores: ", scores_factorial)

print(__name__)
print(uf.__name__)
print(os.path)