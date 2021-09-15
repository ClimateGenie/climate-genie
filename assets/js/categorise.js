// This script contains the function that will interface with the API to classify each paragraph

// Listen for the event that shows there is a new paragraph to classify
document.addEventListener('start_categorise', function (event) {
    // Firstly check if this webpage has been classified before:
    // If so; return results from backend
    // Else execute the classification (adding it to the backend for the next time it is queried)
    // Get the attached paragraph to be classified
    var paragraph = event.detail.paragraph
    var p_id = event.detail.p_id;
    // Run the classification
    // Get a claim indicator
    var cat = get_cat(paragraph, p_id)
    // Create a new event that signals a tag has been recognised (where claim != 0.0)
    var return_categorise = new CustomEvent('return_cat', {'detail': {"category":cat, "p_id": p_id}})
    // Dispatch the event to then be handled by the display function
    document.dispatchEvent(return_categorise)
    }
)

function get_cat(paragraph, id) {
    // // Firstly try to get the classification from the database of previously encountered paragraphs using the url and paragraph ID
        
    // // Use a HTTP Request to try to retrieve the paragraph
    // var cache = new XMLHttpRequest();

    // // Open a new GET request
    // cache.open('GET', 'http://climate-genie-api.herokuapp.com/paragraph/url='+url+'&p_id='+p_id);
    // // Parse the data we get as a reponse
    // cache.onload = function(){
    //     // If the returned status is valid
    //     if(cache.status >= 200 && cache.status < 400){
    //         // Assign the response to the category found
    //         classification = this.response
    //         // Log the message
    //         console.log(classification)
    //         // Serve this to the user as a popup alert
    //         var return_categorise = new CustomEvent('return_cat', {'detail': {"category":classification, "p_id": p_id}})
    //         document.dispatchEvent(return_categorise)
    //     }
    //     // In the case of a bad API call log Error to the console and instead pass to cards 
    //     else {
    //         console.log('Not previously encountered')
    //     }
    // }
    // // Send the request
    // category.send()

    
    // // // Use a HTTP Request to try to retrieve the paragraph
    // var category = new XMLHttpRequest();

    // // Open a new GET request
    // category.open('GET', "");
    // // Parse the data we get as a reponse
    // category.onload = function(){
    //     // If the returned status is valid
    //     if(category.status >= 200 && category.status < 400){
    //         // Assign the response to the category found
    //         classification = this.response
    //         // Log the message
    //         console.log(classification)
    //         // Serve this to the user as a popup alert
    //         var return_categorise = new CustomEvent('return_cat', {'detail': {"category":classification, "p_id": p_id}})
    //         document.dispatchEvent(return_categorise)
    //     }
    //     // In the case of a bad API call log Error to the console and instead pass to cards 
    //     else {
    //         console.log('Error')
    //     }
    // }
    // // Send the request
    // category.send()



if (paragraph.toString().includes('IPCC') == true) {
    // Get a claim indicator
    var cat = '1.1'
}
    else cat = '0.0'

    return cat

}
