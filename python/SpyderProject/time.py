# -*- coding: utf-8 -*-
"""
Created on Sat Apr 11 13:21:42 2020

@author: OLALEKAN
"""

import time;
import datetime;  
 
#prints the number of ticks spent since 12 AM, 1st January 1970  
try: 
    print(time.time()) 
    print(' ')
    print(time.localtime(time.time())) 
    print(' ')
    print(time.gmtime(time.time())) 
    print(' ')
    print(time.asctime(time.localtime(time.time())))
    print(' ')
    print(time.asctime(time.gmtime(time.time())))

    for i in range(0,5):
        print(i);
        time.sleep(0) # each elements will be printed after 3 seconds

    print(datetime.datetime(2020,11,14,23,56,44))
    #print(time.time(2013))     
    
except TypeError:
    print("time() takes no arguments")
except ValueError:
    print("month must be in 1..12")
else:
    print(datetime.datetime.now())    
    print(datetime.datetime.now().year)
    print(datetime.datetime.now().month)
