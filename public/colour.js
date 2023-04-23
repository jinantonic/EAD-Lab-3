(function ($) {
    var currentPage = 0; // The current page of data being displayed
    
    $(document).ready(function() { // When the document is ready
        $("#ColourIdNav").on("keyup", function(event) {
            if (event.keyCode === 13) { // If Enter key is pressed
              event.preventDefault();
              const colourId = $(this).val();
              $("#ColourId").val(colourId);
              $("#btn1").click(); // Trigger button 1 click event
            }
        });

          
        $("#btn1").click(function() { // When the button 1 is clicked
            const colourId = $('#ColourId').val();
            //console.log(colourId);
            $.get(`/colours/${colourId}`, function(colour) {
                // Update the display with the colour details
                $('#hexString').val(colour.hexString);
                $('#RGB').val("RGB(" + colour.rgb.r + ", " + colour.rgb.g + ", " + colour.rgb.b + ")");
                $('#HSL').val("HSL(" + colour.hsl.h + ", " + colour.hsl.s + ", " + colour.hsl.l + ")");
                $('#Name').val(colour.name);
                $('.colour-sample').css('background-color', colour.hexString);
                document.cookie = "colourId=" + colourId + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";

                // update the value of the input box between arrows
                $('#ColourIdNav').val(colourId);
            }).fail(function() {
                // Display an error message if the colour is not found
                alert('Colour not found');
                // $(location).attr('href','404.html');
            });
        }); // End Button 1

        // Retrieve the colourId value from the cookie and set the default value for ColourId
        const currentColor = getCookie("colourId");
        if (currentColor) {
            $("#ColourId").val(currentColor);
            $("#btn1").click();
            $('#ColourIdNav').val(currentColor); // set the value of the input box between arrows
        }

        const maxColor = 256;
        $("#btnLeft").click(function() { // When the left arrow button is clicked
            let colourId = parseInt($('#ColourIdNav').val());
            if (colourId <= 1) {
                colourId = maxColor;
            } else {
                colourId--;
            }
            $('#ColourIdNav').val(colourId);
        });
    
        $("#btnRight").click(function() { // When the right arrow button is clicked
            let colourId = parseInt($('#ColourIdNav').val());
            if (colourId >= maxColor) {
                colourId = 1;
            } else {
                colourId++;
            }
            $('#ColourIdNav').val(colourId);
        });

        $("#btn2").click(function() { // When the button 2 is clicked
            const hexString = $('#hexString').val();
            const rgb = { r: 0, g: 0, b: 0 }; // set default values for RGB
            const hsl = { h: 0, s: 0, l: 0 }; // set default values for HSL
            const name = $('#Name').val();
        
            // Get the highest colorId from the database
            $.get('/colours', function(colours) {
                let maxColorId = 0;
                for (let i = 0; i < colours.length; i++) {
                    if (colours[i].colorId > maxColorId) {
                        maxColorId = colours[i].colorId;
                    }
                }
        
                // Generate a new colorId
                const newColorId = maxColorId + 1;
        
                // Create the new color object
                const newColor = {
                    colorId: newColorId,
                    hexString: hexString,
                    rgb: rgb,
                    hsl: hsl,
                    name: name
                };
        
                // Insert the new color into the database
                $.post('/colours', newColor, function(data, status) {
                    alert(`Colour ${name} inserted successfully`);
                }).fail(function() {
                    // Display an error message if the colour cannot be inserted
                    alert('Error inserting colour');
                });
            });
        }); // End Buttion 2
        
        

        $("#btn3").click(function() { // When the button 3 is clicked
            const colourId = $('#ColourId').val();
            $.ajax({
                url: `/colours/${colourId}`,
                type: 'DELETE',
                success: function(result) {
                    alert(`Colour ${colourId} removed successfully`);
                },
                error: function(xhr, status, error) {
                    if (xhr.status === 404) {
                        alert('Colour not found');
                    } else {
                        alert('Error removing colour');
                    }
                }
            });
        }); // End Button 3
        

        $("#btn4").click(function() { // When the button 4 is clicked
            const colourId = $('#ColourId').val();
            const hexString = $('#hexString').val();
            const rgb = { r: 0, g: 0, b: 0 }; // set default values for RGB
            const hsl = { h: 0, s: 0, l: 0 }; // set default values for HSL
            const name = $('#Name').val();
            $.ajax({
                url: `/colours/${colourId}`,
                type: 'PUT',
                contentType: 'application/json', // Add this line
                data: JSON.stringify({ hexString, rgb, hsl, name }), // Modify this line
                success: function(result) {
                    alert(`Colour ${name} modified successfully`);
                },
                error: function(xhr, status, error) {
                    // Display an error message if the colour cannot be modified
                    alert('Error modifying colour');
                }
            });
        }); // End Buttion 4
        

        $("#btn5").click(function() {
            const colourId = $('#ColourId').val();
            $.get(`/colours/${colourId}`, function(colour) {
                // Update the display with the colour details
                $('#hexString').val(colour.hexString);
                $('#RGB').val("RGB(" + colour.rgb.r + ", " + colour.rgb.g + ", " + colour.rgb.b + ")");
                $('#HSL').val("HSL(" + colour.hsl.h + ", " + colour.hsl.s + ", " + colour.hsl.l + ")");
                $('#Name').val(colour.name);
                $('.colour-sample').css('background-color', colour.hexString);
                $('body').css('background-color', colour.hexString); // Change the background color of the entire page
                document.cookie = "colourId=" + colourId + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
            }).fail(function() {
                // Display an error message if the colour is not found
                alert('Colour not found');
                $(location).attr('href','404.html');
            });
        }); // End Button 5
        

        $("#btn6").click(function() { // When the button 6 is clicked
            $("#table-content tbody").empty(); // clear the table body first
            $.get("/colours", function(colours) {
                $.each(colours, function(index, colour) {
                    const rgbString = "RGB(" + colour.rgb.r + ", " + colour.rgb.g + ", " + colour.rgb.b + ")";
                    const hslString = "HSL(" + colour.hsl.h + ", " + colour.hsl.s + ", " + colour.hsl.l + ")";
                    const row = `<tr>
                                    <td><div class="colour-sample" style="background-color:${colour.hexString}"></div></td>
                                    <td>${colour.colorId}</td>
                                    <td>${colour.name}</td>
                                    <td>${colour.hexString}</td>
                                    <td>${rgbString}</td>
                                    <td>${hslString}</td>
                                    
                                </tr>`;
                    $("#table-content tbody").append(row);
                });
            }).fail(function() {
                // Display an error message if the colours data is not found
                alert('Colours data not found');
                $(location).attr('href','404.html');
            });
        }); // End Button 6



        $("#btn7").click(function() { // When the button 7 is clicked
            $('#ColourId').val('');
            $('#hexString').val('');
            $('#RGB').val('');
            $('#HSL').val('');
            $('#Name').val('');
            $('.colour-sample').css('background-color', '');
        });

        $("#btnLeft").click(function() {
            let currentColourId = parseInt($('#ColourId').val());
            if (!isNaN(currentColourId) && currentColourId > 1) {
                currentColourId--;
                $('#ColourId').val(currentColourId);
                $("#btn1").trigger("click");
            }
        });
        
        $("#btnRight").click(function() {
            let currentColourId = parseInt($('#ColourId').val());
            if (!isNaN(currentColourId)) {
                currentColourId++;
                $('#ColourId').val(currentColourId);
                $("#btn1").trigger("click");
            }
        });
        

        function getCookie(name) {
            const value = "; " + document.cookie;
            const parts = value.split("; " + name + "=");
            if (parts.length === 2) {
              return parts.pop().split(";").shift();
            }
          }
          


    }); // End document ready
})(jQuery); // End jQuery