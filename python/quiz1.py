# -*- coding: utf-8 -*-
"""
Created on Wed May 11 13:36:30 2022

@author: OLALEKAN
"""

# The current volume of a water reservoir (in cubic metres)
reservoir_volume = 4.445e8
print(reservoir_volume)
# The amount of rainfall from a storm (in cubic metres)
rainfall = 5e6
print(rainfall)
# decrease the rainfall variable by 10% to account for runoff
rainfall -= (rainfall* 10/100) 
print(rainfall)
# add the rainfall variable to the reservoir_volume variable
reservoir_volume += rainfall
print(reservoir_volume)
# increase reservoir_volume by 5% to account for stormwater that flows
# into the reservoir in the days following the storm
reservoir_volume += (reservoir_volume* 5/100) 
print(reservoir_volume)
# decrease reservoir_volume by 5% to account for evaporation
reservoir_volume -= (reservoir_volume* 5/100) 
print(reservoir_volume)
# subtract 2.5e5 cubic metres from reservoir_volume to account for water
# that's piped to arid regions.
reservoir_volume -= 2.5e5
# print the new value of the reservoir_volume variable
print(reservoir_volume)

