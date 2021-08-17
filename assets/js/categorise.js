// This script contains the function that will interface with the API to classify each paragraph

// Listen for the event that shows there is a new paragraph to classify
document.addEventListener('start_categorise', function (event) {
    // Firstly check if this webpage has been classified before:
    // If so; return results from backend
    // Else execute the classification (adding it to the backend for the next time it is queried)
    // Get the attached paragraph to be classified
    var paragraph = event.detail
    // Run the classification
    if (paragraph.toString().includes('IPCC') == true) {
        // Get a claim indicator
        var cat = '1.1'
        // Create a new event that signals a tag has been recognised (where claim != 0.0)
        var return_categorise = new CustomEvent('return_cat', {'detail': cat})
        // Dispatch the event to then be handled by the display function
        document.dispatchEvent(return_categorise)
    }
})