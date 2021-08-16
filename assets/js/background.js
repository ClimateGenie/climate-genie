
const run_test = new Event('start_run_test');
const run_parse = new Event('start_parse')


// Listen for new tabs or changed tabs after update
// If event occurs send event for the test to run to occur
chrome.tabs.onUpdated.addListener(function (){
        console.log('detected active tab')
        document.dispatchEvent(run_test)
    }

)



// Wait for response from the test to run page anf then log run statement
document.addEventListener('run', function () {
    console.log('run')
    document.dispatchEvent(run_parse)
    return false}

 );




