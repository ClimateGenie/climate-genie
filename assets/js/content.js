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
                url = chrome.runtime.getURL("message.html");
                popupWindow = window.open('', "Climate Genie", "toolbar=yes,scrollbars=no,resizable=no,menubar=no,titlebar=no,location=no,top="+ (e.pageY)+ ",left="+ (e.pageX)+ ",width=300,height=750");
                // Add Header, genie image, greeting and then message, with the more info broken into a button ideally
                popupCSS = chrome.runtime.getURL("assets/css/message.css")
                headerImage = chrome.runtime.getURL("/assets/Icons/CARDS-Logo2.png")

		    
   		 // Random Genie Image
   		 var path = chrome.runtime.getURL("assets/Icons/Avatars")
		 imgs = ['preach.png','grr.png','question.png','run.png','superman.png', 'think.png','thumbs-up.png','woo.png'],
   		 k = Math.floor(Math.random()*imgs.length);
                popupWindow.document.write("<html><head><link rel='stylesheet' href='" + popupCSS + "'><title>Climate Genie</title></head><body class='frame' style='border-radius: 10px; -webkit-border-radius: 10px; perspective: 1px;'><div id='cg-wrapper'><div id='cg-header' style= 'margin-bottom:90px'><a href='https://climate-genie-api.herokuapp.com/'><img src='" + headerImage + "' style='height:auto; width:200px'></a><br><br><br></div><div id='cg-containers'><p id='message' style='text-align: center; margin-top: 60px'>" + displayArray[i].message +"</p><img id='el' src= '" + path +"/" + imgs[k] + "' style = 'height:auto; width:260px; margin-top: 5px; margin-bottom: 15px;'></div></body></html>")   
            };
            
            // On leaving the text object close any open popups
            ps[p_id].onmouseleave = function () {
                popupWindow.close()
            };
        }
    }
    return true
})
