import file2
d=dir(file2)
print(d)
list = ['Lekan', 5, "Teju",9]
list2 = []

print(list)

print(list[0:])
print(list[3:])
print(list[0:2])
print(list[1:3])
print(list+list)
print(list*4)
list[1] = 99

list2[0:5] = [3,6,8,9,0,6,8,0,7]
print(list)
print(list2[2])
print(list2[4])
print(list2[8])
print(list2)

l = []  # creating an empty list
m = []
t = ()
n = int(input("Enter the number of items you want in the list"))  #define the size of the list

for i in range(0,n):  # for loop from index 0 to index n which is the sixe of list l
     
    l.append(int(input("input an item")))  # insert items into the list
print("Values inside list l are ")    
print(l)
print(len(l)) 

for i in range(0,len(l)):
    
    if l[i] % 2== 0:
 #       continue;
        m.append(l[i]);
        i=i+1
        
print(" Values inside list m are ") 
print(m)   
print(len(m))  
print(max(m)) 
print(t)  

lol = [(101,"Lekan",31,),(102,"Victor",30),(103,"Joshua",24)]
print("printing the present members of TPNL.......")
print(lol)
lol[2]=(104,"Sonia",22)

print(lol)



    
    

#print(l)   #display items in list l

