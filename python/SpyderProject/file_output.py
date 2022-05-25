import subprocess  
  
with open("C:/Users/OLALEKAN/Documents/output.txt", "wb") as f:  
    subprocess.check_call(["python", "function.py"], stdout=f)  
    
  