# -*- coding: utf-8 -*-
"""
Created on Sun May 15 16:29:20 2022

@author: OLALEKAN
"""

points = 174

    
if 1 <= points <= 50:
    prize_name = 'wooden rabbit'
    print("Congratulations! You won a {}!".format(prize_name))
    
elif points >= 51 and points <= 150:
    prize_name = 'no prize'
    print("Oh dear, no prize this time.")
    
elif points >= 151 and points <= 180:
    prize_name = 'wafer-thin mint'
    print("Congratulations! You won a {}!".format(prize_name))    
    
elif points >= 181 and points <= 200:
    prize_name = 'penguin'
    print("Congratulations! You won a {}!".format(prize_name))  

else:
    print("Invalid Point")

    
# perform the above task using truth values

points2 =175    

prize = None

if 1 <= points2 <= 50:
    prize = 'wooden rabbit'
elif 151 <= points2 <= 180:
    prize = 'wafer-thin mint'
elif 181 <= points2 <= 200:
    prize = 'penguin'
    
if prize:
    print("Congratulations! You won a {}!".format(prize))
else: 
    print("Oh dear, no prize this time.")
    
    
    
    
    
#task
weight = 750.6
height = 5.6
result = weight / height**2
print(result)
    
if 18.5 <= weight / height**2 < 25:
    print("BMI is considered 'normal'")
    
else:
    print("BMI is not normal please book for an appointment to see one of our Doctors")
    
        
    