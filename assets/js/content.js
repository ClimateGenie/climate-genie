// Listen for content message
chrome.runtime.onMessage.addListener( function (request) {
    // If the received message is for the display function

    if (request.message == 'disp') {
        // Retrive the display array from the message array
        var displayArray = request.content

        // Iterate function over length of array, note all cat 0.0 has been previously removed
        for (let i = 0; i < displayArray.length; i++) {
            //Take the para id
            var p_id = displayArray[i].p_id
            // Get all the paragraph elements
            var ps = document.getElementsByTagName('p')

            // Underline and turn text green for each paragraph
            ps[p_id].style.backgroundColor = "rgba(60, 179, 113, 0.5)"

            // When hovering over the highlighted element bring up a popup containing the debunk message
            ps[p_id].onmouseover = function (e) {
                // Create a new nonresizable window called 'Climate Genie'
                popupWindow = window.open("", "Climate Genie", "toolbar=yes,scrollbars=no,resizable=no,menubar=no,titlebar=no,location=no,top="+ (e.pageY)+ ",left="+ (e.pageX)+ ",width=400,height=400");
		        popupWindow.document.write('<html><head><title>Climate Genie</title></head><body>');
                // Add Header, genie image, greeting and then message, with the more info broken into a button ideally
                popupWindow.document.write(displayArray[i].message);
                popupWindow.document.write('</body></html>');;
            };
            
            // On leaving the text object close any open popups
            ps[p_id].onmouseleave = function () {
                popupWindow.close()
            };
        }
    }
    return true
})
