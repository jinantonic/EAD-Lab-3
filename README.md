# EAD-Lab-3
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