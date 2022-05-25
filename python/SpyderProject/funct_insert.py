# -*- coding: utf-8 -*-
"""
Created on Sat Apr 18 21:18:52 2020

@author: OLALEKAN
"""

import pymysql




def InsertIntoEmployees(employee_id,firstname,lastname,department_id):
    
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='Kolapoishola123$', database='Cookbook')
    
    #creating the cursor object  
    
    cur = conn.cursor() 
    sql_insert = "INSERT INTO employees (employee_id,firstname,lastname,department_id) VALUES (%s, %s, %s, %s)"
    val2 = (employee_id,firstname,lastname,department_id)
    
    #   cur.execute(sql_insert,val2)
    cur.execute(sql_insert,val2)
    #commit the transaction   
    conn.commit()  
    print("Record inserted successfully into Employees table")
    
    
    cur.close()
    conn.close()
    print("MySQL connection is closed")


 
  
#The row values are provided in the form of tuple   
#val = (11,"Brad", "SKilosky",120) 

#The row values are provided in the form of tuple in a list
#val2 = ((8,"Kayode", "Fatoki",112),(9,"Adediwura", "Onifade",113),(10,"Kenneth", "Smith",116))
  
    #inserting the values into the table  
  
  
    
  
    
    