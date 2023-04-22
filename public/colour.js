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
                $(location).attr('href','404.html');
            });
        }); // End Buttion 1

        const currentColor = getCookie("colourId");
        if (currentColor) {
            $("#ColourId").val(currentColor);
            $("#btn1").click();
        }

        $("#btn2").click(function() { // When the button 2 is clicked


        }); // End Buttion 2

        $("#btn3").click(function() { // When the button 3 is clicked


        }); // End Buttion 3

        $("#btn4").click(function() { // When the button 4 is clicked


        }); // End Buttion 4

        $("#btn5").click(function() { // When the button 5 is clicked


        }); // End Button 5

        function getCookie(name) {
            const cookieValue = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
            return cookieValue ? cookieValue.pop() : null;
        }
    }); // End document ready
})(jQuery); // End jQuery