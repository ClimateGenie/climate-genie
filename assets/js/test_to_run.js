

// listen for new page needed to be tested
document.addEventListener('start_run_test', test_to_run)

function test_to_run() {

   // Hard coded list of keywords to find in title
    let keywords = ['Climate','climate', 'green house', 'Green House','Greenhouse']

    // Set up basis for query
    var queryInfo = {
    active: true,
    currentWindow: true
  };

 chrome.tabs.query(queryInfo, function(tabs) {
     console.log('retrieving tab info')
    var tab = tabs[0];
    var title = tab.title
    var url = tab.url
    var tab_id = tab.id
    let i = 0
    var stat = 0

    var  run = new Event('run',  {  "detail": {"url":url,"tab_id":tab_id } });
    var  idle = new Event('idle',  {  "detail": {"url":url,"tab_id":tab_id } });

     // for each keyword, check if in page title
     // TODO: Add in some form of black list so that this wont trigger on unwanted sites
    while (i < keywords.length) {
        if (title.includes(keywords[i])) {
            stat += 1
        }
        i += 1
    }
    // If enough keywords match, call to run, else idle
    if (stat > 0 ) {

        console.log('dispatch run at tab_id:' + tab_id)
        document.dispatchEvent(run)

    }
    else{ console.log('dispatch idle at tab_id:' + tab_id)
        document.dispatchEvent(idle)}


  })
 return false;}
