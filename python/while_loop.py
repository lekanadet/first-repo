# -*- coding: utf-8 -*-
"""
Created on Tue May 17 16:03:09 2022

@author: OLALEKAN
"""

card_deck = [4, 11, 8, 5, 13, 2, 8, 10]
hand = []
hand2 = []
# adds the last element of the card_deck list to the hand list
# until the values in hand add up to 17 or more
while sum(hand)  < 30:
    hand.append(card_deck.pop())
    
print(hand) 

while sum(hand2) < 30:
    for i in card_deck:
        hand2.append(i)
        
print(hand2)        


num_list = [422, 136, 524, 85, 96, 719, 85, 92, 10, 17, 312, 542, 87, 23, 86, 191, 116, 35, 173, 45, 149, 59, 84, 69, 113, 166]

m = 0

while m < 5:
    for i in num_list:
        m += 1
        if i%2==1:
            i =+ i
        
    
print(m)         
print(i)  
       

    