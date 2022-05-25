import tkinter as t

# frame to pre arrange or pre position widets 
top = t.Tk()


topframe = t.Frame(top)
topframe.pack(side="bottom")

leftframe = t.Frame(top)
leftframe.pack(side="left")

rightframe = t.Frame(top)
rightframe.pack(side="right")
label = t.Label(top, text="helloworld", fg="Purple")
label.pack()

# no matter what position we define now the pre positioned frame will come to effect
Redbutton = t.Button(rightframe, text="Red", fg="Red").pack(side="left")
Bluebutton = t.Button(leftframe, text="Blue", fg="Blue").pack(side="right")
Blackbutton = t.Button(topframe, text="Black", fg="Black").pack(side="top")
Greenbutton = t.Button(top, text="Green", fg="Green").pack(side="bottom")
top.mainloop()