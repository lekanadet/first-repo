# -*- coding: utf-8 -*-
"""
Created on Wed Apr 15 01:51:38 2020

@author: OLALEKAN
"""

import cx_Oracle

import config.py

dsn_tns = cx_Oracle.makedsn('localhost', '1521', service_name='ORCLPDB') # if needed, place an 'r' before any parameter in order to address special characters such as '\'.
conn = cx_Oracle.connect(user=r'sys as sysdba', password='Kolapoishola123$', dsn=dsn_tns) # if needed, place an 'r' before any parameter in order to address special characters such as '\'. For example, if your user name contains '\', you'll need to place 'r' before the user name: user=r'User Name'
print(conn)