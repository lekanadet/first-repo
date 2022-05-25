# -*- coding: utf-8 -*-
"""
Created on Mon Apr 13 01:48:22 2020

@author: OLALEKAN
"""

# -*- coding: utf-8 -*-
a=3
b=8
class Calculation:
   
    def __init__(self,a,b):  
        self.a = a;  
        self.b = b;    
    def sum(a,b): # sum function that adds parameters and return reslt
        return a+b

    def diff(a,b):  # the difference between two integer
        return (a-b)
    def product(a,b):  # the product of the two parameters and return the result
        return (a*b)
    def div(a,b):    # it returrns the whole number of division between two parameters
        return (a/b)   
    def mod(a,b) :
        return (a%b) 
    def exp(a,b) :
        return (a**b)
    def mod2(a,b) :
        return (a%b)*2
    def SI(p,r,t): # this fuction returns the Simple interest for pincipal,rate and time supplied
        return((p*r*t))
    
    def HelloWorld():
        r = input("Type a statement on the screen")
        print(r)



class Modifylist():
    def addtolist(z):
        t = int(input("Enter the size of the list"))
        for i in range(0,t):
            z.append(i)
            i=i+1;
        print(z);
        
class Modifylist2(Calculation,Modifylist):        
    def additem_list(a,b):
        for i in a:
            b.append(i)
            i=i+1
        print(b)
    
    def additem_even_list(a,b):
        for i in a:
            if (a[i]%2)==0:
                b.append(i)
            i=i+1
        print(b)

    def additem_odd_list(a,b):
        for i in a:
            if (a[i]%2)==1:
                b.append(i)
            i=i+1
        print(b)  
        
    def sum(a,b): # sum function that adds parameters and return reslt
        return a+(b**2)   
        
       
     


	
	

     
        

