import tkinter as tk  
from functools import partial  
   
   
def call_result_addition(label_result, n1, n2):  
    num1 = (n1.get())  
    num2 = (n2.get())  
    result = int(num1)+int(num2)  
    label_result.config(text="Result of Addition = %d" % result)  
    
def call_result_subtraction(label_result, n1, n2):  
    num1 = (n1.get())  
    num2 = (n2.get())  
    result = int(num1)-int(num2)  
    label_result.config(text="Result of Subtraction = %d" % result)  

def call_result_multiplication(label_result, n1, n2):  
    num1 = (n1.get())  
    num2 = (n2.get())  
    result = int(num1) * int(num2) 
    label_result.config(text="Result of Multiplication = %d" % result)     
    
def call_result_division(label_result):  
    num1 = (number1.get())  
    num2 = (number2.get())  
    result = int(num1) / int(num2) 
    label_result.config(text="Result of Division = %d" % result)     
     
   
root = tk.Tk()  
root.geometry('400x200+100+200')                                               
  
root.title('Calculator')  
   
number1 = tk.StringVar()  
number2 = tk.StringVar() 
x = tk.IntVar() 
y = tk.IntVar() 
  
labelNum1 = tk.Label(root, text="A").grid(row=1, column=0)  
  
labelNum2 = tk.Label(root, text="B").grid(row=2, column=0)  
  
labelResult1 = tk.Label(root)
labelResult1.grid(row=7, column=2)  

labelResult2 = tk.Label(root)
labelResult2.grid(row=8, column=2) 

labelResult3 = tk.Label(root)
labelResult3.grid(row=9, column=2) 

labelResult4 = tk.Label(root)
labelResult4.grid(row=10, column=2)
  
entryNum1 = tk.Entry(root, textvariable=number1).grid(row=1, column=2)  
  
entryNum2 = tk.Entry(root, textvariable=number2).grid(row=2, column=2)  
  
call_result1 = partial(call_result_addition, labelResult1, number1, number2)  
call_result2 = partial(call_result_subtraction, labelResult2, number1, number2)
call_result3 = partial(call_result_multiplication, labelResult3, number1, number2)
call_result4 = partial(call_result_division, labelResult4)
  
buttonCal1 = tk.Button(root, text="Add", command=call_result1).grid(row=3, column=0)  
buttonCal2 = tk.Button(root, text="Subtract", command=call_result2).grid(row=4, column=0)
buttonCal3 = tk.Button(root, text="Multiply", command=call_result3).grid(row=5, column=0)
buttonCal4 = tk.Button(root, text="Divide", command=call_result4).grid(row=6, column=0)
  
root.mainloop()  