// This script contains the initial checking mechanism to determine whether a site's content should be checked or not

// Listen for the event that shows there is a new page to check and execute the function test_to_run
document.addEventListener('start_check', test_to_run)

// Dispatches an event of either run/idle in response to the question regarding whether or not the site content should be checked.
function test_to_run() {

   // Hard coded list of keywords to find in the title and judge relevance
    let keywords = ['climate', 'green house','greenhouse', 'global warming', 'renewable', 'emissions']

    // Set up basis for a query
    var queryInfo = {
    active: true,
    currentWindow: true
  };

    chrome.tabs.query(queryInfo, function( tabs) {
    // Log the event taking place
    console.log('Retrieving Tab Info')
    // Instantiate all the tab information details
    var tab = tabs[0];
    var title = tab.title
    var url = tab.url
    var tab_id = tab.id
    // Instantiate the two possible output events
    var  run = new Event('run',  {"detail": {"url":url,"tab_id":tab_id } });
    var  idle = new Event('idle',  {"detail": {"url":url,"tab_id":tab_id } });

    // Instantiate a counter to check relevance
    var stat = 0
        // For each keyword, check if in page title
        // TODO: Add in some form of black list so that this wont trigger on unwanted sites
    for (let i = 0; i < keywords.length; i++) {
        if (title.toLowerCase().includes(keywords[i])) {
            stat += 1
        }
    }
    // If enough keywords match, call to run, else idle
    if (stat > 0) {
        console.log('Dispatch Run at Tab_id:' + tab_id)
        document.dispatchEvent(run)
    }
    else{ console.log('Dispatch Idle at Tab_id:' + tab_id)
        document.dispatchEvent(idle)}
    })}
