# -*- coding: utf-8 -*-
"""
Created on Fri Apr 10 23:16:02 2020

@author: OLALEKAN
"""
import function as f



a = int(input("Enter the first value"))
b = int(input("Enter the second value"))
p = int(input("Enter the value prinicipal Amount"))
r = float(input("At what rate "))
t = int(input("Enter the time to pay back the Loan"))




print(f.sum(a,b));
print(f.diff(a,b));
print(f.product(a,b));
print(f.div(a,b));
print(f.mod(a,b));
print(f.exp(a,b));
print(f.SI(p,r,t));

x=[]
y=[] 
evennum=[]
oddnum=[]

f.addtolist(x);
f.additem_list(x,y); 
f.additem_even_list(x,evennum) 
f.additem_odd_list(y,oddnum)
