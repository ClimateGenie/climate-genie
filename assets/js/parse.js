// This script contains the parse mechanism that is triggered only if the current page is deemed relevant -> see check.js

// Listen for the event that dictates that the tab contents should be parsed and call the parser function
document.addEventListener('start_parse', parser)

// Reads the contents of the page broken up by <p></p> tags
function parser() {
	
	// Firstly log that the function is running
	console.log('Parsing content')
	// Queries the current tab
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		var tab = tabs[0];
		// Get the url of the current tab
		var domain = tab.url.toString();
		// Begin a new HTTP request 
		let xhr = new XMLHttpRequest();
		// Once loaded ->
		xhr.onload = () => {
			// Get all elements in the body of the response that are paragraph text
			var resultText = xhr.response.body.getElementsByTagName('p');
			// Return the 1st of these. (innerHTMl strips the tags and just gives text)

			// Iterate through the returned text (specifically paragraph text)
			for (let i = 0; i < resultText.length; i++){
				// Get the string from that element -> using innerHTML to strip away unecessary tags/characters
				var string = resultText[i].innerHTML
				// Create a new event containing the above generated string
				var paragraph = new CustomEvent('paragraph_found', {"detail":  string})
				// Dispatch this event to be picked up and processed back in the background scripts
				document.dispatchEvent(paragraph)
			}
		}
		// On error occurring log to console
		xhr.onerror = () => console.error('error');
		xhr.open("GET", domain, true);
		// IMPORTANT: response type must be a document in order to use it as a normal site object
		xhr.responseType = 'document';
		// Send the response
		xhr.send();
});	
}