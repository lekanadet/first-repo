# -*- coding: utf-8 -*-
"""
Created on Sun May 15 15:37:04 2022

@author: OLALEKAN
"""

phone_balance = 3
bank_balance = 50

if phone_balance < 5:
    phone_balance += 10
    bank_balance -= 10
    
print(phone_balance, '\n')
print(bank_balance, '\n')  

#Third Example - try to change the value of age
age = 3

# Here are the age limits for bus fares
free_up_to_age = 4
child_up_to_age = 18
senior_from_age = 65

# These lines determine the bus fare prices
concession_ticket = 1.25
adult_ticket = 2.50

if age <= free_up_to_age:
    ticket_price = 0
elif age <=   child_up_to_age:
     ticket_price = concession_ticket
elif age >= senior_from_age:
    ticket_price = concession_ticket
else:
    ticket_price = adult_ticket

message = 'Somebody whose age is {} will pay a ticket fee of ${} to ride the bus.'.format(age,ticket_price)
print(message)    
    
    

   

  