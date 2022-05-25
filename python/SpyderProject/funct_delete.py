# -*- coding: utf-8 -*-
"""
Created on Sat Apr 18 21:18:52 2020

@author: OLALEKAN
"""

import pymysql




def DeletefromEmployees(department_id):
    
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='Kolapoishola123$', database='Cookbook')
    
    #creating the cursor object  
    
    cur = conn.cursor() 
    sql_delete = "delete from employees where department_id = (%s)"
    val2 = (department_id)
    
    #   cur.execute(sql_insert,val2)
    cur.execute(sql_delete,val2)
    #commit the transaction   
    conn.commit()  
    print("Record deleted from Employees table successfully")
    
    
    cur.close()
    conn.close()
    print("MySQL connection is closed")


 
  
#The row values are provided in the form of tuple   
#val = (11,"Brad", "SKilosky",120) 

#The row values are provided in the form of tuple in a list
#val2 = ((8,"Kayode", "Fatoki",112),(9,"Adediwura", "Onifade",113),(10,"Kenneth", "Smith",116))
  
    #inserting the values into the table  
  
  
    
  
    
    
