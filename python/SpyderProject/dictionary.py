EmployeeDetails = {"Name":"Lekan","Gender":"Male","Age":31,"Company":"Technotrend"}
print(EmployeeDetails)
print("printing EmployeeDetails data .... ")  
print("Name : %s" %EmployeeDetails["Name"]) 
print("Gender : %s" %EmployeeDetails["Gender"])   
print("Age : %d" %EmployeeDetails["Age"])  
print("Company : %s" %EmployeeDetails["Company"])  

EmployeeDetails2 = {"Name": "John", "Gender":"Male","Age": 29,"Company":"GOOGLE"}
print(EmployeeDetails2)
print("printing new EmployeeDetails data .... ") 
EmployeeDetails2["Name"] = input("Name:")
EmployeeDetails2["Gender"] = input("Gender:")   
EmployeeDetails2["Age"] = int(input("Age:")) 
EmployeeDetails2["Company"] = input("Company:")

print(EmployeeDetails2)