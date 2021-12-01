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

    // Instantiate a counter to check relevance
    var stat = bayesfilter(title)
    // If enough keywords match, call to run, else idle
    if (stat > 0.5) {
        console.log('Dispatch Run at Tab_id:' + tab_id + ', Probability of ' + stat)
        document.dispatchEvent(run)
    }
    else{ console.log('Dispatch Idle at Tab_id:' + tab_id+ ', Probability of ' + stat)
        document.dispatchEvent(idle)}
    })}

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
     var title = tab.title
     var url = tab.url
     var tab_id = tab.id
     // Instantiate the possible output event
     var  run = new CustomEvent('run',  {"detail": {"url":url,"tab_id":tab_id } });

     // Dispatch the event
     console.log('Dispatch Run at Tab_id:' + tab_id)
     document.dispatchEvent(run)
     })}


function bayesfilter(str) {

    let requestURL = 'https://raw.githubusercontent.com/Fonzzy1/climate-genie/main/assets/json/probabilities.json'
    let request = new XMLHttpRequest();
    request.onload = () => {
        const probs_raw = request.response; // get the string from the response
        var p = JSON.parse(probs_raw); // convert it to an object

        var string_arr =  str.split(" ")
        var a = 1
        var b = 1
        // Note equation in for a/(a+b), a = product of p, b = product 1-p
        for (let i = 0; i < string_arr.length; i++) {
            var hold= p["0"][string_arr[i].toLowerCase()]
            if (hold < 1){
                a *= hold
                b *= 1-hold
            }
        }
    
        var stat = a/(a+b)
        return stat
      };
    request.open('GET', requestURL)
    request.responseType = 'json';
    request.send();
}
