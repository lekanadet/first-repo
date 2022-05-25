age = int(input("Enter your age "))
if age >= 18:
    print("You are eligible to vote")
else:
    print("You are not eligible to vote")

if age % 2 == 0:
    print("This is an Even number")
else:
    print("This is a Odd number")

if age == 10:
    print("The number is 10")
elif age == 50:
    print("This number is equal to 50")
elif age == 100:
    print("This number is equal to 100")
else:
    print("The number is not equal to 10,50 or 100")

if age > 85 and age <= 100:
    print("Congrats you had a Distinction")
elif age > 60 and age <= 85:
    print("Congrats you had a B+ grade")
elif age > 40 and age <= 60:
    print("You scored a B grade")
elif age > 30 and age <= 40:
    print("You scored a C grade")
else:
    print("You failed")





i = 0
l = len(Day)

for i in Day:
    if i!="Saturday" or "Sunday":
        WeekDay.add(Day[i]);
    else:
        Weekend.add(Day[i])



