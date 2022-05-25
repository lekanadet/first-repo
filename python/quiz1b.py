# -*- coding: utf-8 -*-
"""
Created on Wed May 11 13:41:51 2022

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
# add the rainfall variable to the reservoir_volume variable
reservoir_volume += rainfall
# increase reservoir_volume by 5% to account for stormwater that flows
# into the reservoir in the days following the storm
reservoir_volume += (reservoir_volume* 5/100) 
# decrease reservoir_volume by 5% to account for evaporation
reservoir_volume -= (reservoir_volume* 5/100) 
# subtract 2.5e5 cubic metres from reservoir_volume to account for water
# that's piped to arid regions.
reservoir_volume -= 2.5e5
# print the new value of the reservoir_volume variable
print(int(reservoir_volume))

sf_population, sf_area = 864816, 231.89
rio_population, rio_area = 6453682, 486.5

san_francisco_pop_density = sf_population/sf_area
rio_de_janeiro_pop_density = rio_population/rio_area

# Write code that prints True if San Francisco is denser than Rio, and False otherwise
result = san_francisco_pop_density < rio_de_janeiro_pop_density
print(result)

this_string = 'Simon\'s skateboard is in the garage.'
print(this_string)

# TODO: Fix this string!
ford_quote = "Whether you think you can, or you think you can\'t--you\'re right."
print(ford_quote)


given_name = "William"
middle_names = "Bradley"
family_name = "Pitt"

#name_length = (given_name + " " + middle_names + " " + family)
name_length = len(given_name) + len(" ")+ len(middle_names) + len(" ") + len(family_name)
#todo: calculate how long this name is
print(name_length)
# Now we check to make sure that the name fits within the driving license character limit
# Nothing you need to do here
driving_license_character_limit = 28
print(name_length <= driving_license_character_limit)

mon_sales = "121"
tues_sales = "105"
wed_sales = "110"
thurs_sales = "98"
fri_sales = "95"

mon_sales_int = int("121")
tues_sales_int = int("105")
wed_sales_int = int("110")
thurs_sales_int = int("98")
fri_sales_int = int("95")
total = mon_sales_int+tues_sales_int+wed_sales_int+thurs_sales_int+fri_sales_int
print(total)

#TODO: Print a string with this format: This week's total sales: xxx
# You will probably need to write some lines of code before the print statement.

print("This week's total sales: " + str(total))