// This script contains the script that handles displaying to the user

// Listen for the event that shows there is a label to show
document.addEventListener('run_display', function (e) {
    // Get the label
    var cat = e.detail.category
    var p_id = e.detail.p_id

    // Use a HTTP Request to retrieve the debunk response
    var debunk = new XMLHttpRequest();

    // Open a new GET request
    debunk.open('GET', 'http://climate-genie-api.herokuapp.com/debunk/'+cat);
    // Parse the data we get as a reponse
    debunk.onload = function(){
        // If the returned status is valid
        if(debunk.status >= 200 && debunk.status < 400){
            // Assign the response to teh variable message
            message = this.response
            // Log the message
            console.log(message)
            // Serve this to the user as a popup alert
            var send = new CustomEvent ('send_response',{"detail": {"message": message, "p_id": p_id}})
            document.dispatchEvent(send)
        }
        // In the case of a bad API call log Error to the console as well as the HTTP erro
        else {
            console.log('Error')
        }
    }
    // Send the request
    debunk.send()
})