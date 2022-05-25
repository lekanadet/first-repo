# -*- coding: utf-8 -*-
"""
Created on Mon Apr 13 01:48:35 2020

@author: OLALEKAN
"""

# -*- coding: utf-8 -*-
"""
Created on Fri Apr 10 23:16:02 2020

@author: OLALEKAN
"""
import class1 as f # import class1 module



a = int(input("Enter the first value "))
b = int(input("Enter the second value "))
p = int(input("Enter the value prinicipal Amount "))
r = float(input("At what rate "))
t = int(input("Enter the time to pay back the Loan "))

c1 =f.Calculation(3,6) #c1 is an object of Calculation and got the attirbutes 3 and 6 of the constructor of the parent or base class Calculation
c = f.Calculation # c is an object of class Calculation wth no attributes
m = f.Modifylist  # m is an object of class Calculation
m2 =f.Modifylist2 # m2 is an object of class Modifylist2 but also object of Calculation and Modifylist thry inheritance
m3 =f.Modifylist2(4,8) #m3 is an object of Modifylist2 but inherited the attributes (4 and 8) of the constructor of the parent class Calculation

print(c.sum(a,b));  # accessing fucntion sum of class Calculation 
print(m2.sum(a,b));  # accessing fucntion sum of class Modifylist2 which is a overridden method 
print(m2.diff(a,b)); # accessing function diff of class Calculation via inheritance capability of python using m2 which is an object of Modifylist2 because it is a child class of Calculation
print(c.product(a,b));# accessing fucntion product of class Calculation
print(c.div(a,b));   # accessing fucntion div of class Calculation
print(c.mod(a,b));   # accessing fucntion mod of class Calculation
print(c.exp(a,b));   # accessing fucntion exp of class Calculation
print(c.SI(p,r,t));   # accessing fucntion SI of class Calculation

x=[]
y=[] 
evennum=[]
oddnum=[]

m.addtolist(x);   # accessing fucntion addlist of class Modifylist
m2.additem_list(x,y);    # accessing fucntion additem_list of class Modifylist2
m2.additem_even_list(x,evennum)    # accessing fucntion additem_even_list of class Modifylist2
m2.additem_odd_list(y,oddnum)      # accessing fucntion additem_odd_list of class Modifylist2

print(getattr(c1,'a'))   # printing on screen attribute a of Calculation
print(getattr(c1,'b'))   # printing on screen attribute b of Calculation
print(getattr(m3,'a'))   # printing on screen attribute a of Modifylist2 which is an original feature or attrinute of parent class Calculation
print(getattr(m3,'b'))   # printing on screen attribute b of Modifylist2 which is an original feature or attribute of parent class Calculation