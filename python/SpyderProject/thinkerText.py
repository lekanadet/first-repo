import tkinter as t
top = t.Tk()  
text = t.Text(top)  
text.insert(t.INSERT, "Name.....")  
text.insert(t.END, "Salary.....")  
  
text.pack()  
  
text.tag_add("Write Here", "1.0", "1.4")  
text.tag_add("Click Here", "1.8", "1.16")  
  
text.tag_config("Write Here", background="yellow", foreground="black")  
text.tag_config("Click Here", background="black", foreground="white")  
  
top.mainloop()  