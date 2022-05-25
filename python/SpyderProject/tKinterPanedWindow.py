import tkinter as t
  
def add():  
    a = int(e1.get())  
    b = int(e2.get())  
    leftdata = int(a+b)  
    left.insert(1,leftdata)  
  
w1 = t.PanedWindow()  
w1.pack(fill = t.BOTH, expand = 1)  
  
left = t.Entry(w1, bd = 5)  
w1.add(left)  
  
w2 = t.PanedWindow(w1, orient = t.VERTICAL)  
w1.add(w2)  
  
e1 = t.Entry(w2)  
e2 = t.Entry(w2)  
  
w2.add(e1)  
w2.add(e2)  
  
bottom = t.Button(w2, text = "Add", command = add)  
w2.add(bottom)  
  
t.mainloop()