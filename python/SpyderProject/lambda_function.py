x = lambda a:a+10
y = lambda a,b:a+b
print("Sum ",x(20))
print("Sum ",y(30,15))

def table(n):
    return lambda a:a+n

n = int(input("Enter max number"))
b = table(n)
for i in range(1,11):
    print(n,"+",i,"=",b(i));
    
a = [1,2,3,4,10,-123,22]

result = list(map((lambda x:x*3),a)) # map fucntion to a to a lambda fuction that returns 3times a number
Oddresult =list(filter((lambda x:x%2==1),a)) # filters out odd numbers in a
Evenresult =list(filter((lambda x:x%2==0),a)) # filters out even numbers in a
Absolute_result = list(map((lambda x:abs(x)),a)) # returns the absolute value of all elements in a
Bin_result = list(map((lambda x:bin(x)),a))# returns binary value of all elements in a
Callable_result = list(map((lambda x:callable(x)),a)) # are elements of a callable or not
float_result = list(map((lambda x:float(x**3)),a))
Divmod_result = list(map((lambda x:divmod(x,2)),a))

print(result)
print(Oddresult)
print(Evenresult)
print(Absolute_result)
print(Bin_result)
print(Callable_result)
print(float_result)
print(Divmod_result)



