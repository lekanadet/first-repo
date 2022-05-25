from tkinter import Toplevel, Button, Tk, Menu, Label,Message
from functools import partial  

def hello(welcome_message): 
    welcome_message.config(text="Welcome To Javatpoint")
    
def show_message():    
    msg = Message( top, text = "File Saved")
    show_msg = msg.pack()
  
top = Tk()  

menubar = Menu(top) 

labelResult = Label(top)
labelResult.pack()  
callResult = partial(hello,labelResult)

file = Menu(menubar, tearoff=0)  
file.add_command(label="Welcome Message",command=callResult)  
menubar.add_cascade(label="Welcome", menu=file)  

 
file = Menu(menubar, tearoff=0)  
file.add_command(label="New")  
file.add_command(label="Open")  
file.add_command(label="Save",command = show_message)  
file.add_command(label="Save as...")  
file.add_command(label="Close")  
file.add_separator()  
file.add_command(label="Exit", command=top.quit)  
menubar.add_cascade(label="File", menu=file)  

edit = Menu(menubar, tearoff=0)  
edit.add_command(label="Undo")  
edit.add_separator()    
edit.add_command(label="Cut")  
edit.add_command(label="Copy")  
edit.add_command(label="Paste")  
edit.add_command(label="Delete")  
edit.add_command(label="Select All")  
menubar.add_cascade(label="Edit", menu=edit)  

help = Menu(menubar, tearoff=0)  
help.add_command(label="About")  
menubar.add_cascade(label="Help", menu=help)  
  
top.config(menu=menubar)  
top.mainloop()