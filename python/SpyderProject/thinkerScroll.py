import tkinter as t
  
top = t.Tk()  
sb = t.Scrollbar(top)  
sb.pack(side = "right", fill = t.Y)  
  
mylist = t.Listbox(top, yscrollcommand = sb.set )  
  
for line in range(30):  
    mylist.insert(t.END, "Number " + str(line))  
  
mylist.pack( side = t.LEFT )  
sb.config( command = mylist.yview )  
  
t.mainloop()  