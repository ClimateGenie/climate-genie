// Listen for content message
chrome.runtime.onMessage.addListener( function (request) {
    // If the received message is for the display function

    if (request.message == 'disp') {
        // Retrive the display array from the mesae
        var displayArray = request.content

        // Iterate function over length of array, note all cat 0.0 has been previously removed
        for (let i = 0; i < displayArray.length; i++) {
            //Take the para id
            var p_id = displayArray[i].p_id
            // Get all the paragraph elements
            var ps = document.getElementsByTagName('p')

            // Underline and turn text green for each paragraph
            ps[p_id].style.backgroundColor = 'green'

            ps[p_id].onmouseover = function (e) {
                popupWindow =window.open("", "Climate Genie", "toolbar=yes,scrollbars=no,resizable=no,menubar=no,titlebar=no,top="+ (e.pageY)+ ",left="+ (e.pageX)+ ",width=400,height=400");
		popupWindow.document.write('<html><head> <title>Climate Genie</title><link rel="stylesheet" type="text/css" href="css/newsCSSWindow.css"></head><body>');
                popupWindow.document.write(displayArray[i].message);
                popupWindow.document.write('</body></html>');;
            }
            
            ps[p_id].onmouseleave = function () {
		 popupWindow.close()
            }
            
            ;
        }
    }
    return true
})
