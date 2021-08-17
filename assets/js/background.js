// Primary Executor of the extension functionality

// Event Triggers
const run_check = new Event('start_check');
const run_parse = new Event('start_parse')


// This listens for when tabs receive a package be it in loading/updating/refreshing
chrome.tabs.onUpdated.addListener(function (){
        // Log the event trigger
        console.log('Update Tab Detected')
        // Dispatch an event to trigger the 'run-check' function
        // This function will then check what actions need to occur for the current page/tab -> see check.js
        document.dispatchEvent(run_check)
})


// Wait for response from the test to run page anf then log run statement
document.addEventListener('run', function () {
    // Log the event trigger
    console.log('Parse the page contents')
    // Dispatch an event to trigger the 'run-parse' function
    document.dispatchEvent(run_parse)
    return false});

// Listen for the parser isolating paragraphs and process occordingly
document.addEventListener('paragraph_found', function (e) {
    // Get the attached content in the event detail
    var paragaph  = e.detail
    // Log to console communicating that the paragraph has been seen (include paragraph chunk to check all are seen)    
    console.log('Paragraph Found: ' + paragaph.slice(0,20) + '...' )
    // Create a new event for the detected paragraph that will announce it is ready to be categorised.
    var run_categorise = new CustomEvent('start_categorise', {"detail":  paragaph})
    // Dispatch this event
    document.dispatchEvent(run_categorise)
})

// Listen for the recieval of non-zero classifications
document.addEventListener('return_cat', function (e) {
    // Get the specific label
    var cat = e.detail
    // Log the label
    console.log('Claim categorized as: ' + cat )
    // Create a new event to trigger the display to user
    var run_display = new CustomEvent('run_display', {"detail": cat})
    // Dispatch event for listener
    document.dispatchEvent(run_display)
})


