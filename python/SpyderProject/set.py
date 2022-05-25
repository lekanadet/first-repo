Days = {"Monday"}
Day = set({"Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"})
Weekday = {"Monday","Tuesday","Wednesday","Thursday","Friday"}
Weekend = {"Saturday","Sunday"}
for i in Day:
    if i == "Tuesday":
        Days.add(i)
    
print(Day) 
print(Days)    

for i in Day: 
    if i != "Monday":
        Days.discard(i)
    
print(Day) 
print(Days) 

for i in Days: 
    Day.discard(i)   
    
print(Day) 
print(Days)  
print(Days|Day)    
print(Days&Weekday)
print(Day>Days)
print(Weekday>Days)
print(Weekend<Day)


