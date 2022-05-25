from tkinter import Spinbox,Tk 
  
top = Tk()  
  
top.geometry("200x200")  
  
spin = Spinbox(top, from_= 0, to = 25)  
  
spin.pack()  
  
top.mainloop() 