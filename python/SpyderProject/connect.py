# -*- coding: utf-8 -*-
"""
Created on Wed Apr 15 02:12:26 2020

@author: OLALEKAN
"""

import cx_Oracle

con = cx_Oracle.connect('sys as sysdba/Kolapoishola123$@1localhost/ORCLPDB')
ver = con.version.split(".")

con.close()