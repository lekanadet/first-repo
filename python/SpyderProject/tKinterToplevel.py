import tkinter as t
root = t.Tk()  
  
root.geometry("200x200")  
  
def open():  
    top = t.Toplevel(root)  
    top.mainloop()  
  
btn = t.Button(root, text = "open", command = open)  
  
btn.place(x=75,y=50)  
  
root.mainloop()  