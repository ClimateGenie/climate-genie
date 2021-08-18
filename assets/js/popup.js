// Variable to store a reference to the background.js file
var backgroundPage;
var background_vars = chrome.extension.getBackgroundPage();


// Create an event listener within the popup to check when the content is loaded (incorporates updates)
document.addEventListener('DOMContentLoaded', function () {

    // Set color of run button
    if (background_vars.running == true) {
        document.getElementById('cg-run').style.background = '#20cc55'
        document.getElementById('cg-run').style.borderColor = '#20cc55'
        document.getElementById('cg-run').textContent = 'Active'
    }

    else
    {
        document.getElementById('cg-run').style.background = '#1A73E8'
        document.getElementById('cg-run').style.borderColor = '#1A73E8'
        document.getElementById('cg-run').textContent = 'Run'
    }

    document.getElementById('cg-run').addEventListener('click', function () {
        document.getElementById('cg-run').style.background = '#20cc55'
        document.getElementById('cg-run').style.borderColor = '#20cc55'
        document.getElementById('cg-run').textContent = 'Active'
    })

    document.getElementById('cg-run').addEventListener('click', function () {
        chrome.runtime.sendMessage({message: 'Manual Run'})
    })
    /*TOGGLE*/
    restoreOptions();
    // Create a variable to store the switch input (it's a stylised checkbox)
    var checkbox = document.querySelector('input[type="checkbox"]');

    // Add a listener to this element sensitive to change
    checkbox.addEventListener('change', function () {
    // If the checkbox is checked (on)...
        if (checkbox.checked) {
            // Access the background page
            chrome.runtime.getBackgroundPage(function(bgPage){
                // Set it to the reference variable
                backgroundPage = bgPage;
                // Change the value of extensionEnabled to true
                backgroundPage.extensionEnabled = true;
                // Save current input for the checkbox
                save_options();
            })
        } 
        else {
            // Access the background page
            chrome.runtime.getBackgroundPage(function(bgPage){
                // Set it to the reference variable
                backgroundPage = bgPage;
                // Change the value of extensionEnabled to false
                backgroundPage.extensionEnabled = false;
                // Save current input for the checkbox
                save_options();
        })
       };
    })
    /*RUN-MANUAL*/
    // Get the button element
    var run_button = document.getElementById('cg-run');
    // Add a listener to this element sensitive to clicks
    run_button.addEventListener('click', function () {
        // When clicked connect to the background.js page and dispatch an event
        // Access the background page
        chrome.runtime.getBackgroundPage(function(bgpage){
            // Set it to the reference variable
            backgroundPage = bgpage;
            // Update manualRun variable to true
            //backgroundPage.manualRun = true;

        })
    });
});


/*CHECKBOX-STATE-MEMORY*/
// Because popups reload everytime they are opened this allows us to save button states and anything else mutable
function save_options() {
    var checked = document.querySelector('input[id="toggleOnOff"]').checked;
    chrome.storage.local.set({value: checked}, function() {
      });
};

function restoreOptions() {
    // Use default value = false.
    chrome.storage.local.get({
        value: false
    }, function (items) {
        document.querySelector('input[id="toggleOnOff"]').checked = items.value
    });
};
