# -*- coding: utf-8 -*-

def HelloWorld():
    print("Hello World People")
    
HelloWorld();  

def sum(a,b): # sum function that adds parameters and return reslt
    return (a+b)
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

def SI(p,r,t): # this fuction returns the Simple interest for pincipal,rate and time supplied
    return((p*r*t)/100)
    
    


def addtolist(z):
    t = int(input("Enter the size of the list"))
    for i in range(0,t):
        z.append(i)
        i=i+1;
    print(z)
def additem_list(a,b):
    for i in a:
        b.append(i)
        i=i+1
    print(b)
    
def additem_even_list(a,b):
    for i in a:
        if a[i]%2==0:
            b.append(i)
        i=i+1
    print(b)

def additem_odd_list(a,b):
    for i in a:
        if a[i]%2==1:
            b.append(i)
        i=i+1
    print(b)    
     




     
        

