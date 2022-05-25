import tkinter as t

# pack() Method  Example
top = t.Tk()
label = t.Label(top, text="helloworld", fg="Purple")
label.pack()
Redbutton = t.Button(top, text="Red", fg="Red").pack(side="left")
Bluebutton = t.Button(top, text="Blue", fg="Blue").pack(side="right")
Blackbutton = t.Button(top, text="Black", fg="Black").pack(side="top")
Greenbutton = t.Button(top, text="Green", fg="Green").pack(side="bottom")
top.mainloop()

# grid() Method  Example
parent = t.Tk()
name = t.Label(parent, text="Name", fg="black").grid(row= 0,column=0)
e1 = t.Entry(parent).grid(row= 0,column=1)
password = t.Label(parent, text="Password", fg="black").grid(row= 1,column=0)
e2 = t.Entry(parent).grid(row= 1,column=1)
button = t.Button(parent, text="Submit", fg="black").grid(row = 2, column=1)
parent.mainloop()

# place() Method  Example
window = t.Tk()
window.geometry("300x200")
name = t.Label(window, text="Name", fg="black").place(x=30,y=70)
email = t.Label(window, text="Email", fg="black").place(x=30,y=100)
password = t.Label(window, text="Password", fg="black").place(x=30,y=130)
button = t.Button(window, text="Submit", fg="black").place(x=90,y=160)
e1 = t.Entry(window).place(x=90,y=70)
e2 = t.Entry(window).place(x=90,y=100)
e3 = t.Entry(window).place(x=90,y=130)
window.mainloop()



