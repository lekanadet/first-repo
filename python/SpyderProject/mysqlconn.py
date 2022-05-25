# -*- coding: utf-8 -*-
"""
Created on Mon Apr 13 15:45:06 2020

@author: OLALEKAN
"""

import mysql.connector  
#Create the connection object   
myconn = mysql.connector.connect(host='127.0.0.1', port=3306, user='root', passwd='Kolapoishola123$', database='information_schema')  
  
#printing the connection object   
print(myconn)