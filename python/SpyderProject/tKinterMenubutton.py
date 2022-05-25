import tkinter as tk  
  
top = tk.Tk()  
  
top.geometry("200x250")  
  
menubutton = tk.Menubutton(top, text = "Language")  
  
menubutton.grid()  
  
menubutton.menu = tk.Menu(menubutton)  
  
menubutton["menu"]=menubutton.menu  
  
menubutton.menu.add_checkbutton(label = "Hindi", variable=tk.IntVar())  
  
menubutton.menu.add_checkbutton(label = "English", variable = tk.IntVar())  
  
menubutton.pack()  
  
top.mainloop()  
