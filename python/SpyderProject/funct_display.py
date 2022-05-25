# -*- coding: utf-8 -*-
"""
Created on Sun Apr 19 00:23:41 2020

@author: OLALEKAN
"""

import pymysql


def DisplayEmployees():
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='Kolapoishola123$', database='Cookbook')

    cur = conn.cursor()  
    sql_show = "select * from employees order by employee_id"
    #display values in the table  
    cur.execute(sql_show)
    print ("employee_id    firstname    lastname    department_id")
    for row in cur:
        print(row[0],"            ",row[1],"        ",row[2],"         ",row[3])
    cur.close()
    conn.close() 