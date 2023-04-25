# EAD Lab 3 - Express.js 
This assignment is about using **Express.js** for managing an application that performs operations related to colours.<br><br>
The file with all the 256 colours can be downloaded from the Colours URL: https://jonasjacek.github.io/colors/ <br>
The exact links for the JSON object is: https://www.ditig.com/downloads/256-colors.json

<br>
The file consists of an array of 256 elements where each element has the following fields:
<br>- colorId: The number of colours on the list.
<br>- hexString: The value in hexadecimal number
<br>- RGB: The code of the colour in RGB format.
<br>- Hsl: The code of the colour of HSL format.
<br>- Name: The name of the colour in plain English.
<br><br>
For example, the black colour has: {"colorId":0, "hexString":"#000000", "rgb": {"r":0,"g":0,"b":0}, "hsl": {"h":0,"s":0,"l":0}, "name":"Black"}.

<br><br>
To accomplish the assignment, you will need to create a server in Express.js that will read from a file an object in JSON format which is an array with many fields about colours. Use the methods: GET, POST, PUT, and DELETE. You can use any library/framework related to JavaScript such as Angular, React, Axios for
developing the assignment.

</br></br>

## README File
My GitHub repo is https://github.com/jinantonic/EAD-Lab-3.</br>
You can find the detailed README file at https://github.com/jinantonic/EAD-Lab-3/blob/main/README.md.</br>
This file contains clearer instructions on how to navigate my website and the parts that I have accomplished.

</br></br>

## My solution
![Sketch](images/port.png)
In the **index.js** file, the port number is set as 8080.

</br>

![Sketch](images/node.png)
Run **node public/index.js** on the terminal and check if a node server is running.

</br>

![Sketch](images/localhost.png)
Once it is running successfully, go to http://localhost:8080/index.html on the browser to see the website.

</br>

![Sketch](images/home.png)
This is the first look at the website. The main page consists of **8 buttons** on the left side, and the **colour input boxes** along with the **colour display box** on the right side. Below them, there are **left** and **right arrow buttons** for navigating and the **input box** to enter the colour id manually.

</br>

### First Button
![Sketch](images/1st.png)
Enter the colour id and click the **Show Colour** button. It retrieves and displays the details of the colour with the specified colour id.

</br>

### Second Button
![Sketch](images/2nd.png)
Moving onto the second button, enter the new colour details such as hexString, RGB, HSL and Name, and click the **Insert Colour** button. If I insert the new colour, the new row will be appended to the end of the table. 

</br>

![Sketch](images/2nd-msg.png)</br>
After you get the success message, you can refresh the homepage and click **Show Table**. 

</br>

![Sketch](images/2nd-table.png)
You can see the new colour **SteelBlueBlues** was added to the table along with the success message.

</br>

### Third Button
![Sketch](images/3rd.png)
Then we move on to the **Modify Colour** button. Enter the new colour details such as hexString, RGB, HSL and Name, and click the **Modify Colour** button.

</br>

![Sketch](images/3rd-msg.png)</br>
After you get the success message, you can refresh the homepage and click **Show Table**. 

</br>

![Sketch](images/3rd-green-1.png)
![Sketch](images/3rd-green-2.png)
You can see the colour **Green** was modified as **GreenGreen** with the new details.

</br>

### Fourth Button
![Sketch](images/4th.png)
Then we move on to the **Remove Colour** button. Enter the colour id and select the **Show Colour** button to display the colour that you would like to remove. Check the displayed colour and click **Remove Colour** button to remove it.  

</br>

![Sketch](images/4th-msg.png)</br>
After you get the success message, you can refresh the homepage and click **Show Table**.

</br>

![Sketch](images/4th-olive-1.png)
![Sketch](images/4th-olive-2.png)
You can see the colour **Olive** was removed. If I remove a colour, the corresponding table row will be removed from the table.

</br>

### Fifth Button
![Sketch](images/5th.png)
Then we move on to the **Clear** button. It clears all the input fileds and the display box of the colour, which allows the users to enter the new inputs without manually deleting the previous inputs.

</br>

![Sketch](images/5th-clear.png)
As you can see, all the input fields and the display box is empty.

</br>

### Sixth Button
![Sketch](images/6th.png)
Then we move on to the **Select Background** button. Enter the colour id and select the **Show Colour** button to display the colour. Check the displayed colour and click **Select Background** button to choose it as a background.  

</br>

![Sketch](images/6th-bg.png)
As you can see, it retrieves the colour details with the specified colour id and sets the
background colour of the entire page to that colour.



