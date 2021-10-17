// Variable to store a reference to the background.js file
var backgroundPage;

// Create an event listener within the popup to check when the content is loaded (incorporates updates)
document.addEventListener('DOMContentLoaded', function () {

    backgroundPage = chrome.extension.getBackgroundPage();


    // Assign a  random genie image to the 'el' div
    //Assign a variable to the loaction of the genie avatars
    var path = '/assets/Icons/Avatars'
    // Hard code in a list of images TODO:Change to dynamic list	
    imgs = ['preach.png','grr.png','question.png','run.png','superman.png', 'think.png','thumbs-up.png','woo.png']
    // Get a random index I for the list of images
    i = Math.floor(Math.random()*imgs.length);
    // Set the src for the empty el element with the random image
    document.getElementById('el').src = path+'/' +imgs[i]



    // Alter the style of the run button for various states
    
    //For the off state	
    if ( ! backgroundPage.extensionEnabled) {
        document.getElementById('cg-run').style.background = '#808286'
        document.getElementById('cg-run').style.borderColor = '#808286'
        document.getElementById('cg-run').textContent = 'Inactive'
    }

    // For the active state
    else if (backgroundPage.running && backgroundPage.extensionEnabled) {
        document.getElementById('cg-run').style.background = '#20cc55'
        document.getElementById('cg-run').style.borderColor = '#20cc55'
        document.getElementById('cg-run').textContent = 'Active'
    }

    // For the idle state	
    else
    {
        document.getElementById('cg-run').style.background = '#1A73E8'
        document.getElementById('cg-run').style.borderColor = '#1A73E8'
        document.getElementById('cg-run').textContent = 'Run'
    }
    
    // Add event listener to the run button
    document.getElementById('cg-run').addEventListener('click', function () {
        // Set appearance changes to match the activee stat
        document.getElementById('cg-run').style.background = '#20cc55'
        document.getElementById('cg-run').style.borderColor = '#20cc55'
        document.getElementById('cg-run').textContent = 'Active'
        // Send message stating a manual run has bee requested
	// Will be Managed by background.js 
        chrome.runtime.sendMessage({message: 'Manual Run'})
    });


    /*TOGGLE*/
    restoreOptions();
    // Create a variable to store the switch input (it's a stylised checkbox)
    var checkbox = document.querySelector('input[type="checkbox"]');

    // Add a listener to this element sensitive to change
    checkbox.addEventListener('change', function () {
    // If the checkbox is checked (on)...
        if (checkbox.checked) {
            // Change the value of extensionEnabled to true
            backgroundPage.extensionEnabled = true;
            // Save current input for the checkbox
            save_options();
        } 
        else {
            // Change the value of extensionEnabled to false
            backgroundPage.extensionEnabled = false;
            // Save current input for the checkbox
            save_options();
       };
    })
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
