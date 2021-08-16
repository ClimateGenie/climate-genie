// Primary Executor of the extension functionality

// Event Triggers
const run_check = new Event('start_check');
const run_parse = new Event('start_parse')


// This listens for when tabs receive a package be it in loading/updating/refreshing
chrome.tabs.onUpdated.addListener(function (){
        // Log the event trigger
        console.log('Active Tab Detected')
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




