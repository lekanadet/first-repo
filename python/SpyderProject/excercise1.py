l1 = [4,5,6,['a','o']]  #this a list
l2 = list('Hi')   #this is a list
l3 = list('787653')
l4 = [1,2,3,l2]
l5 = l3+list('lekan')
t1 = tuple('yinka')
t2 = t1+(45,'9*765')
t3 = (t1,45,'9*765')
d1 = {'Name':'Lekan','Age':18,'Gender':'Male'}
a=4
b=2

print(l1) 
print(l2)
print(l1[0:1],l2)
print(l1[0:1]+l2)
print(l3)
print(l4)
print(l5)
print(t1)
print(t2)
print(t2[0:6])
print(t3)
print(t3[0:1])
print(d1)
print(d1.keys())
print(d1.values())
print(d1['Name'])
print(~a)
print(~b)