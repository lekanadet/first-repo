# -*- coding: utf-8 -*-
"""
Created on Thu May 19 14:58:56 2022

@author: OLALEKAN
"""


name = []
missed_assignment = []
grade = []
future_grade = []
length = len(name)
num = int(input("Please Input the no of students you want to treat: "))
while length < num:
    try:
        a = str(input("Enter your name here: "))
        b = int(input("Enter Missing Assignments count here: "))
        c = int(input("Enter your Current Grade here: "))
        d =  (2*b)+c
        length += 1
        name.append(a)
        missed_assignment.append(b)
        grade.append(c)
        future_grade.append(d)
    except TypeError:
        print("Invalid Type")
    except ValueError:
        print("Invalid Number")    
    

print(d)

message = []
for x,y,z,r in zip(name,missed_assignment,grade,future_grade):
    #r = 2(y)+z 
    message.append("Hi {},\n\nThis is a reminder that you have {} assignments left to \
    submit before you can graduate. You're current grade is {} and can increase \
    to {} if you submit all assignments before the due date.\n\n".format(x,y,z,r))
    
for i in message:
    print(i) 
   

