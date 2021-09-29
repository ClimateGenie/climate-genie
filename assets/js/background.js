// Primary Executor of the extension functionality

// Variable to store the status of the extension
var extensionEnabled = true;
// Boolean to track whether or not the extension is running on the 
var running = false
// Value for current URL
var current_url
// Array to store all messages to be displayed for the current url
var messageArray
// A counter that is the length of message array just set independently
var messageCounter = 0
// Varable to store the ta_id for the run statement, saves it getting passed through all the events
var tab_id


// Event Triggers
const run_check = new Event('start_check');
const run_nocheck = new Event('start_run');
const run_parse = new Event('start_parse');


// Add a listener for messages sent from the popup
chrome.runtime.onMessage.addListener( function (request) {
    // If the received message is requesting a manual run
    if (request.message == 'Manual Run') {
        // If the process is not already running
        if(!running) {
            // Set running
            running = true
            // Log the event trigger
            console.log('manual run')
            // Dispatch an event to trigger the 'run-check' function
            // This function will then check what actions need to occur for the current page/tab -> see check.js
            document.dispatchEvent(run_nocheck)
            }
        else {
            return false
        }
        }
    else {
        return false
    }
})


// This listens for when tabs are activated
chrome.tabs.onUpdated.addListener(function (){
    pageCheck()
});


// Wait for response from the test to run page anf then log run statement
document.addEventListener('run', function (e) {
    if (e.detail.url != current_url) {
        // Set current url
        current_url = e.detail.url
        //Set the tab_id
        tab_id = e.detail.tab_id
        // empty message array
        messageArray = []
        var messageCounter = 0
        // Set running to be true
        running = true;
        // Log the event trigger
        console.log('Parse the page contents')
        // Dispatch an event to trigger the 'run-parse' function
        document.dispatchEvent(run_parse)
        return false
    }
    else return false
});


// Listen for idle event
document.addEventListener('idle', function (e) {
        if (e.detail.url != current_url) {
            // Set current url
            current_url = e.detail.url
            // empty message array
            messageArray = []
            var messageCounter = 0
            // Set running to be false
            running = false
            return false
        }
    else return false

});


// Listen for the parser isolating paragraphs and process occordingly
document.addEventListener('paragraph_found', function (e) {
    // Get the attached content in the event detail
    var paragaph  = e.detail.paragraph
    var p_id = e.detail.p_id
    var url = e.detail.url
    // Get the maximum paragraph index and set this as the message counter
    if (p_id > messageCounter){
        // Set the message counter to the paragraph ID
        messageCounter = p_id
    }
    // Log to console communicating that the paragraph has been seen (include paragraph chunk to check all are seen)    
    console.log('Paragraph Found: ' + paragaph.slice(0,20) + '...' )
    // Create a new event for the detected paragraph that will announce it is ready to be categorised.
    var run_categorise = new CustomEvent('start_categorise', {"detail":  {"paragraph":paragaph, "p_id": p_id, "url": url}})
    // Dispatch this event
    document.dispatchEvent(run_categorise)
})

// Listen for the recieval of non-zero classifications
document.addEventListener('return_cat', function (e) {
    // Get the specific label
    var cat = e.detail.category
    var p_id = e.detail.p_id
    // Log the label
    console.log('Claim categorized as: ' + cat )
    // Create a new event to trigger the display to user
    var run_display = new CustomEvent('run_display', {"detail": {"category":cat, "p_id": p_id}})
    // Dispatch event for listener after a short delay to account for async
    document.dispatchEvent(run_display)
})

// Add an event listener for all the responses sent from the display script
document.addEventListener('send_response', function (e) {
    // Gather the message to be displayed
    var message = e.detail.message
    var p_id = e.detail.p_id
    // Add the message to the messageArray, along with the id
    messageArray.push({message:message, p_id:p_id})
    // Check if the array contains all the messages of the url (async problems, async solutions)
    // Add 1 to message counter to account for 0 indexing
    if (messageArray.length == messageCounter + 1)
            // Create a new image array 'displayArray' which filters out non-misinformation for display
            // TODO -> only show distinct categories
            {var diplayArray = messageArray.filter(function(item) {
                return item.message != "\"No misinformation\"\n"})
        //Send meaasge to content script to display
        chrome.tabs.sendMessage(tab_id,{message:"disp", content:diplayArray});
    }
})

/*BACKGROUND FUNCTIONS*/
function pageCheck(){
    // Check whether or not the extension is enabled
    if (extensionEnabled) {
        // Log the event trigger
        console.log('Update Tab Detected')
        // Dispatch an event to trigger the 'run-check' function
        // This function will then check what actions need to occur for the current page/tab -> see check.js
        document.dispatchEvent(run_check)
    }
    else {
        // Just do nothing if it's not enabled
        return false;
    }
};