// This script contains the initial checking mechanism to determine whether a site's content should be checked or not

// Listen for the event that shows there is a new page to check and execute the function test_to_run
document.addEventListener('start_check', test_to_run)
document.addEventListener('start_run', just_run)

// Dispatches an event of either run/idle in response to the question regarding whether or not the site content should be checked.
function test_to_run() {

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
    var  run = new CustomEvent('run',  {"detail": {"url":url,"tab_id":tab_id } });
    var  idle = new CustomEvent('idle',  {"detail": {"url":url,"tab_id":tab_id } });

    // Parse the page title to the API to check whether or not the article is climate related
    // Use a HTTP Request to retrieve the probabilistic estimate
    var likelihood = new XMLHttpRequest();

    // Open a new GET request
    likelihood.open('GET', 'http://climate-genie-api.herokuapp.com/bayes/'+title);
    // Parse the data we get as a reponse
    likelihood.onload = function(){
        // If the returned status is valid
        if(likelihood.status >= 200 && likelihood.status < 400){
            // Assign the response to the variable message
            stat = this.response
            // If enough keywords match, call to run, else idle
            if (stat > 0.5) {
                console.log('Dispatch Run at Tab_id:' + tab_id + ', Probability of ' + stat)
                document.dispatchEvent(run)
            }
            else{ console.log('Dispatch Idle at Tab_id:' + tab_id+ ', Probability of ' + stat)
                document.dispatchEvent(idle)}
        }
        // In the case of a bad API call log Error to the console as well as the HTTP error
        else {
            console.log('Error')
        }
    }
    // Send the request
    likelihood.send()
    })
}

// Runs the site content regardless of what it is
function just_run() {

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
     var url = tab.url
     var tab_id = tab.id
     // Instantiate the possible output event
     var  run = new CustomEvent('run',  {"detail": {"url":url,"tab_id":tab_id } });

     // Dispatch the event
     console.log('Dispatch Run at Tab_id:' + tab_id)
     document.dispatchEvent(run)
     })}

