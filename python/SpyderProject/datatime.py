# -*- coding: utf-8 -*-
"""
Created on Sat Apr 11 14:22:02 2020

@author: OLALEKAN
"""

import datetime

dt = datetime.datetime

if dt(dt.now().year,dt.now().month,dt.now().day,8) < dt.now()< dt(dt.now().year,dt.now().month,dt.now().day,14,35):
    print("Working Hours")
else:
    print("Outside Working Hours")    