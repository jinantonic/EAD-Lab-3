(function ($) {
    var currentPage = 0; // The current page of data being displayed
    
    $(document).ready(function() { // When the document is ready
        $("#btn1").click(function() { // When the button 1 is clicked
            const colourId = $('#ColourId').val();
            console.log(colourId);
            $.get(`/colours/${colourId}`, function(colour) {
                // Update the display with the colour details
                $('#hexString').val(colour.hexString);
                $('#RGB').val("RGB(" + colour.rgb.r + ", " + colour.rgb.g + ", " + colour.rgb.b + ")");
                $('#HSL').val("HSL(" + colour.hsl.h + ", " + colour.hsl.s + ", " + colour.hsl.l + ")");
                $('#Name').val(colour.name);
                $('.colour-sample').css('background-color', colour.hexString);
                document.cookie = "colourId=" + colourId + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
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
        }

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
                data: { hexString, rgb, hsl, name },
                success: function(result) {
                    alert(`Colour ${name} modified successfully`);
                },
                error: function(xhr, status, error) {
                    // Display an error message if the colour cannot be modified
                    alert('Error modifying colour');
                }
            });


        }); // End Buttion 4

        $("#btn5").click(function() { // When the button 5 is clicked
            const colourId = $('#ColourId').val();
            $.get(`/colours/${colourId}`, function(colour) {
                // Update the display with the colour details
                $('#hexString').val(colour.hexString);
                $('#RGB').val("RGB(" + colour.rgb.r + ", " + colour.rgb.g + ", " + colour.rgb.b + ")");
                $('#HSL').val("HSL(" + colour.hsl.h + ", " + colour.hsl.s + ", " + colour.hsl.l + ")");
                $('#Name').val(colour.name);
                $('.colour-sample').css('background-color', colour.hexString);
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

        $("#btn8").click(function() {
            $.ajax({
                url: '/reset',
                type: 'PUT',
                success: function(result) {
                    alert('Colors reset successfully');
                    location.reload(); // Reload the page to display the reset data
                },
                error: function(xhr, status, error) {
                    // Display an error message if the reset fails
                    alert('Error resetting colors');
                }
            });
        });
        

        function getCookie(name) {
            const cookieValue = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
            return cookieValue ? cookieValue.pop() : null;
        }


    }); // End document ready
})(jQuery); // End jQuery