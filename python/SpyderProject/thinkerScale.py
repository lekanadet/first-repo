from tkinter import Tk,DoubleVar,Scale,Button
import tkinter as t 
  
def select():  
   sel = "Value = " + str(v.get())  
   label.config(text = sel)  
     
top = Tk()  
top.geometry("200x100")  
v = t.IntVar()  
scale = Scale( top, variable = v, from_ = 1, to = 50, orient = t.VERTICAL)  
scale.pack(anchor=t.CENTER)  
  
btn = Button(top, text="Value", command=select)  
btn.pack(anchor=t.CENTER)  
  
label = t.Label(top)  
label.pack()  
  
top.mainloop()  