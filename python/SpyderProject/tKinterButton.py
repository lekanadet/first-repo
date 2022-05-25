import tkinter as t
  
top = t.Tk()  
  
top.geometry("200x100")  
  
def fun1():  
    t.messagebox.showinfo("Hello", "Red Button clicked")  
def fun2():  
    t.messagebox.showinfo("Hello", "blue Button clicked")
def fun3():  
    t.messagebox.showinfo("Hello", "green Button clicked")
def fun4():  
    t.messagebox.showinfo("Hello", "yellow Button clicked")    
  
  
b1 = t.Button(top,text = "Red",command = fun1,activeforeground = "red",activebackground = "pink",padx=10,pady=10,bd=5,bg="white")  
  
b2 = t.Button(top, text = "Blue",command = fun2,activeforeground = "blue",activebackground = "pink",padx=10,pady=10,bd=5,bg="white")  
  
b3 = t.Button(top, text = "Green",command = fun3,activeforeground = "green",activebackground = "pink",padx=10,pady = 10,bd=5,bg="white")  
  
b4 = t.Button(top, text = "Yellow",command = fun4,activeforeground = "yellow",activebackground = "pink",padx=10,pady = 10,bd=5,bg="white")  
  
b1.pack(side = "left")  
  
b2.pack(side = "right")  
  
b3.pack(side = "top")  
  
b4.pack(side = "bottom")  
  
top.mainloop() 
