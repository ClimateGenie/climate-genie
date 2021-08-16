// This script contains the parse mechanism that is triggered only if the current page is deemed relevant -> see check.js

// Listen for the event that dictates that the tab contents should be parsed and call the parser function
document.addEventListener('start_parse', parser)

// Reads the contents of the page broken up by <p></p> tags
function parser() {
	
	// Firstly log that the function is running
	console.log('Parsing content')
	chrome.tabs.query({ currentWindow: true, active: true }, function ( tabs) {
		var tab = tabs[0];
		var domain = tab.url.toString();
		let xhr = new XMLHttpRequest();
		xhr.onload = () => {
			let doc = xhr.responseXML;
			var resultText = xhr.response.body.innerHTML;
			console.log(resultText)
		}
		xhr.onerror = () => console.error('error');
		xhr.open("GET", domain, true);
		xhr.responseType = 'document';
		xhr.send();

});
	
}