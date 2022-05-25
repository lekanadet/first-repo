import tkinter as tk  

top = tk.Tk()
top.geometry("250x200")

frame = tk.Frame(top)
frame.pack(side="top")

bottomframe = tk.Frame(top)
bottomframe.pack(side="bottom")

label = tk.Label(frame,text="A list of Favourite Countries")


listbox = tk.Listbox(top,height="15",bg="red",fg="blue",selectmode="single")

listbox.insert(1,"Nigeria")
listbox.insert(2,"USA")
listbox.insert(3,"Italy")
listbox.insert(4,"South Africa")
listbox.insert(5,"Japan")
listbox.insert(6,"Australia")
listbox.insert(7,"New Zealand")
listbox.insert(8,"Brazil")
listbox.insert(9,"Ireland")
listbox.insert(10,"Germany")
listbox.insert(11,"Turkey")
listbox.insert(12,"India")

button1 = tk.Button(bottomframe,text = "delete", command = lambda listbox = listbox:listbox.delete(0))
button2 = tk.Button(top,text = "add", command = lambda listbox = listbox:listbox.insert(11,"Rwanda")).place(x=180,y=220)
label.pack()
button1.pack()
listbox.pack()
top.mainloop()
