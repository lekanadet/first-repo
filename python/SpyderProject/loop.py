import file2 as f
from function import mod 
s=dir(f)
n = int(input(" Enter first number"))
m = int(input(" Enter second number"))
o = int(input(" Enter any number"))
t = m+n
i = 10
k = 1
list_all_no = []
list_even_no = []
list_odd_no = []
for i in range(0, n):
    if mod(i,2) == 0:
        print(str(i) + " is an even number")
    else:
        print(str(i) + " is an odd number")
        
for j in range(0, m):
    if mod(j,2) == 0:
        if j==0:
            list_even_no.append(j)
            #list_even_no.pop()
        else:    
            list_even_no.append(j)
    else:    
        list_odd_no.append(j)           

for z in range(0,t):
    list_all_no.append(f.square(z)) # calling the function square rep as s of the imported module file2 
 
print(s)   
print(list_even_no)    
print(list_odd_no) 
print(list_all_no)  
print(list(map(f.power,list_all_no))) # calling the function power rep as p of the imported module file2 while using it with map in built function

for t in list_all_no:  
    print(t," C - ",f.c_to_f(t)," F")   # calling the function c_to_f rep as c of the imported module file2

    
for k in range(1,o+1): 
    print("%dx%d=%d"%(m,k,m*k))
    print()
   
# -*- coding: utf-8 -*-

