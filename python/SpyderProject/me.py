# -*- coding: utf-8 -*-
"""
Created on Sat Apr 11 23:33:55 2020

@author: OLALEKAN
"""

class Employee:  
    id = 10;  
    name = "John"  
    def display (self):  
        print("ID: %d \nName: %s"%(self.id,self.name))      
emp = Employee()  
emp.display() 