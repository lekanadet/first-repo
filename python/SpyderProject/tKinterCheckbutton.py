import tkinter as t
  
top = t.Tk()  
  
top.geometry("200x200")  
  
checkvar1 = t.IntVar()  
  
checkvar2 = t.IntVar()  
  
checkvar3 = t.IntVar()  
  
chkbtn1 = t.Checkbutton(top, text = "C", variable = checkvar1, onvalue = 1, offvalue = 0, height = 2, width = 10).pack() 
  
chkbtn2 = t.Checkbutton(top, text = "C++", variable = checkvar2, onvalue = 1, offvalue = 0, height = 2, width = 10).pack()  
  
chkbtn3 = t.Checkbutton(top, text = "Java", variable = checkvar3, onvalue = 1, offvalue = 0, height = 2, width = 10).pack()   
  
top.mainloop()  
