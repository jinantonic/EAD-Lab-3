(function ($) {
    var currentPage = 0; // The current page of data being displayed
    
    $(document).ready(function() { // When the document is ready
        $("#btn1").click(function() { // When the button 1 is clicked
            const colourId = $('#ColourId').val();
            $.get(`/colours/${colourId}`, function(colour) {
                // Update the display with the colour details
                $('#hexString').val(colour.hexString);
                $('#RGB').val(colour.rgb);
                $('#HSL').val(colour.hsl);
                $('#Name').val(colour.name);
                $('.colour-sample').css('background-color', colour.hexString);
            }).fail(function() {
                // Display an error message if the colour is not found
                alert('Colour not found');
            });
              

        }); // End Buttion 1

        $("#btn2").click(function() { // When the button 2 is clicked


        }); // End Buttion 2

        $("#btn3").click(function() { // When the button 3 is clicked


        }); // End Buttion 3

        $("#btn4").click(function() { // When the button 4 is clicked


        }); // End Buttion 4

        $("#btn5").click(function() { // When the button 5 is clicked


        }); // End Buttion 5
    }); // End document ready
})(jQuery); // End jQuery