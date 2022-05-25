# -*- coding: utf-8 -*-
"""
Created on Sun Apr 12 02:20:11 2020

@author: OLALEKAN
"""
a=2
b=4
c=8
class Calculation:
    def __init__(self,name,id,age):  
        self.id = id;  
        self.name = name;
        self.age = age;
    def Summation(self,a,b,c):
        return 2*(self.name+self.id+self.age)
    
    def Summation1(self,a,b,c):
        return a+b;
    
    
class Calculation1:
    def Summation(self,a,b): 
        self.a = a
        self.b = b
        return self.a+self.b 

class Calculation2:  
    def Multiplication(a,b):  
        return a*b
    def Multiplication2(a,b):  
        return a**2
    

  

class Derived(Calculation,Calculation1,Calculation2):  
    def Divide(self,a,b):  
        return self.a/self.b;
    
c2 = Calculation2    
d = Calculation(2,2,6)
e = Calculation1()
print(c2.Multiplication(a,b))
print(c2.Multiplication2(a,b))
print(d.Summation(a,b,c)) 
print(d.Summation1(a,b,c))
print(e.Summation(a,b))
#print(e.Divide(a,b)) 
print(isinstance(d,Derived)) 
print(isinstance(d,Calculation2))  
print(isinstance(d,Calculation))