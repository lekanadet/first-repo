from tkinter import Radiobutton,Label,Tk,IntVar
import tkinter as t  
def selection():  
   selection = "You selected the option " + str(radio.get())  
   label.config(text = selection)  
  
top = Tk()  
top.geometry("300x150")  
radio = IntVar()  
lbl = Label(text = "Favourite programming language:")  
lbl.pack()  
R1 = Radiobutton(top, text="C", variable=radio, value=1,  
                  command=selection)  
R1.pack( t.anchor = W )  
  
R2 = Radiobutton(top, text="C++", variable=radio, value=2,  
                  command=selection)  
R2.pack( t.anchor = W )  
  
R3 = Radiobutton(top, text="Java", variable=radio, value=3,  
                  command=selection)  
R3.pack( t.anchor = W)  
  
label = Label(top)  
label.pack()  
top.mainloop()  