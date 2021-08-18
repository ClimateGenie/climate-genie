// This script contains the script that handles displaying to the user

// Listen for the event that shows there is a label to show
document.addEventListener('run_display', function (e) {
    // Get the label
    var cat = e.detail
    // Split the label into claim and subclaim
    if ( cat != 0) {
        var [main, sub] = cat.split('.')

        // TODO: Make this a backend lookup for responses
        var responses = [['0.0', '0.1'], ['1.0', 'this is false']]

        // Lookup the corresponding message based on the claim and subclaim
        var message = responses[main][sub]

        // Serve this to the user as a popup alert
        alert(message)
    }
})