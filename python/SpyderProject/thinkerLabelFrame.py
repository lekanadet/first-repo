import tkinter as t  
  
top = t.Tk()  
top.geometry("300x200")  
  
labelframe1 = t.LabelFrame(top, text="Positive Comments")  
labelframe1.pack(fill="both", expand="yes")  
  
toplabel = t.Label(labelframe1, text="Place to put the positive comments")  
toplabel.pack()  
  
labelframe2 = t.LabelFrame(top, text = "Negative Comments")  
labelframe2.pack(fill="both", expand = "yes")  
  
bottomlabel = t.Label(labelframe2,text = "Place to put the negative comments")  
bottomlabel.pack(side = "left")  
  
top.mainloop() 