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
    var cat = get_cat(paragraph)
    // Create a new event that signals a tag has been recognised (where claim != 0.0)
    var return_categorise = new CustomEvent('return_cat', {'detail': {"category":cat, "p_id": p_id}})
    // Dispatch the event to then be handled by the display function
    document.dispatchEvent(return_categorise)
    }
)

function get_cat(paragraph) {
if (paragraph.toString().includes('IPCC') == true) {
    // Get a claim indicator
    var cat = '1.1'
}
    else cat = '0.0'

    return cat

    }
