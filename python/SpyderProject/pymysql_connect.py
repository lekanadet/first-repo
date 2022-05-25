# -*- coding: utf-8 -*-
"""
Created on Sat Apr 18 21:18:52 2020

@author: OLALEKAN
"""

import pymysql

conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='Kolapoishola123$', database='Cookbook')


#creating the cursor object  
 
sql_insert = """INSERT INTO employees (employee_id,firstname,lastname,department_id) VALUES (%s, %s, %s, %s)"""
val = (14,"Ashley", "Thomas",120)
val2 = [(11,"Brad", "SKilosky",120),(12,"Adedolapo", "Osuntokun",119),(13,"Ojo", "Micheals",124)]
 
cur = conn.cursor() 
cur.execute(sql_insert,val)  
cur.executemany(sql_insert,val2)  
  
#commit the transaction   
conn.commit()  
  
    
sql_show = "select * from employees"
 #display values in the table  
cur.execute(sql_show)

for x in cur:
    print(x)
    
cur.close()
conn.close()    