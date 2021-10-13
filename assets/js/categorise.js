// This script contains the function that will interface with the API to classify each paragraph

// Listen for the event that shows there is a new paragraph to classify
document.addEventListener('start_categorise', function (event) {
    // Firstly check if this webpage has been classified before:
    // If so; return results from backend
    // Else execute the classification (adding it to the backend for the next time it is queried)
    // Get the attached paragraph to be classified
    var paragraph = event.detail.paragraph
    var p_id = event.detail.p_id;
    var url = event.detail.url;
    // Run the classification
    // Get a claim indicator
    var category = new XMLHttpRequest();
    // Open the get request
    category.open('GET', 'http://climate-genie-api.herokuapp.com/classify/?url='+url+'&p_id='+p_id+'&para="'+paragraph+'"')
    category.onload = function(){
        // If the returned status is valid
        if(category.status >= 200 && category.status < 400){
            // Parse the json response
            resp = JSON.parse(this.response)
            // Assign the response to the category found taking away the quotation marks
            classification = resp.claim
            // Also get the probability of the classification
            prob = resp.prob
            // Log the message
            // Serve this to the user as a popup alert
            var return_categorise = new CustomEvent('return_cat', {'detail': {"category":classification, "p_id": p_id, "prob": prob}})
            document.dispatchEvent(return_categorise)
        }
        // In the case of a bad API call log Error to the console and instead pass to cards 
        else {
            console.log('Not previously encountered')
        }
    }
    // Send the request
    category.send()
    }
)
