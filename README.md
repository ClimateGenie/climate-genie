# Climate-Genie

Built in conjuction with the Monash Climate Change Communcation Hub, this web extension seeks to address the issue of Climate Change misinformation in Australian media.

Utilising the CARDS API created by Dr John Cook and Dr Travis Coan, the Climate Genie web extension parses news articles related to Climate Change, checking each paragraph for misinformation, to then present the idenitified misniformation and a counter.

This application runs off of Javascript with the supplement of a personal Flask API for dynamic debunk claims for each identified misinformation claim.

![sample-web-view](https://github.com/Fonzzy1/climate-genie/blob/main/assets/Screenshots/Popup.png)



# Design Docs

Note: See inline comments for specific functions, these notes are for the overall design philosophy

This extention was built using the V2 Google Chrome extention manifest, however will soon need to be remade for V3 once support for V2 is phased out. The main runlist of the script is found in ./assets/js/background.js, however litle computation is done using this script. Instead, this script is used to manage and send events to various other scripts located in ./assets/js. This was  done for two reasons. Firstly, since we are running the extention across multiple DOMs, managing which variables are defined where is important. Secondly, it allows for the code to be modularised, allowing functions to be swapped in and out as needed.

## Popup Static

The popup for the extention is defined in popup.html, with the associated script ./assets/js/popup.js, and style sheet ./assets/css/popup.css. The popup contains a switch, a random genie avatar, a contact button and a run button/indicator. The main funtion of the popup is to manage the states of the extention, being off, idle and active. However, the variables managing these states are stored  in the background page loaded in a different DOM. Therefore messages are used to convey changes in states between the two scripts. The script uses chrome's local storage to store user variables which will be needed to be updated to browser local storage in order to be ported to other browsers.

## Runtime
![sample-web-view](https://github.com/Fonzzy1/Climate-Genie/blob/main/assets/Screenshots/runtime.jpg?raw=true)

The background page is defined in ./assets/js/background.js. All events for the extension get passed through the background page. The background page is triggered on one of two events, either reciveing the chrome runtime message stating 'Manual Run' coming from the popup run button being clicked, or the webNavigation.onCompleted event coming from a user changing webpage. The former dispatches the event 'start_run' while the latter dispatches the event 'start_check'.

### Check
The check phase of the runtime is defined in the ./assets/js/check.js script. It is triggered upon receiving the 'start_run' or the 'start_check' events from the background page. In both cases, the current tabs title and url extracted and in the case of the 'start_run' event, an event containing the tab id and url stating 'run' will be sent. In the case that the 'start_check' function was recived, the tab title is passed through a Bayes filter. The model for this filter is defined at the bottom of check.js while in future this could become an API call, or make use of the static jQuery module to instead store this as an independent JSON object. 
If the Bayes filter returns a probability of greater than 0.5, then the 'run' event will be sent. When the run event is received, the background page checks if the url has changed to stop 'double runs', and if it has the 'start_parse' event will be dispatched.

#### Bayes Filtering

Bayes filtering is a very basic form of probability modelling for text categorisation. It answers the question of 'what is the probability that the text is about climate?' by determining the combined probability that any text is about climate given it contains one of the words in the text. The training data for this model was taken from reddit. Comparing post titles from r/climate to r/all, Each word can then be assigned a p score by taking the probabilty the word is in a r/climate tile and dividing it by the probability the word was in a title in r/all. One can then combine these p scores to get the overall probability that a text is about climate by taking the product of the p scores divided by the product of the p scores added to the product of one minus the p scores. This gives the total probability that the text is about climate.

### Parse
The parse function is managed by parse.js. Upon recieving the 'start_parse' event, it checks the url of the tab and then loads a GET request to that url. The body of the request response is then split on the paragraphs tags in the html. An event 'paragraph_found' containing the paragraph, the index of the paragraph and the url is dipatched for each paragraph. The background page manages the request, counting how many paragraphs there are, and then dispatching a new event 'start_categorise' for each paragraph containing the paragraph content, paragraph_id and url. 

### Categorise
The categorisation of paragraphs is done as an API call to the climate-genie-api. This call is made from the categorise.js script, where upon receiving the 'start_categorise' event a GET request is formatted with the paragraph content, paragraph_id and url and then sent. The response is then sent back to the background page in the 'return_cat' event. For more information on the API see the repository climate-genie-api. The 'return_cat' event is managed by the background page from where the 'run_display' event is sent containing the categorization, the paragraph id and the probability.

### Content
The content is primarily handled by the climate-genie-api. The call definition is located in  display.js, where once the 'run_display' event is recieved, each paragraph with its categorisation is sent to the API in a GET request and the debunking statment for that categorisation is returned. This debunking statment is then sent in the event 'send_response'. The background page will then receive the event and add each debunking statment to an array. Once the array is full, an event containing the array called 'disp' will be sent.

### Display
The script content.js is defined as a content script in the manifest, therefore it is loaded in to each webpage visited. When it receives the 'disp' message it will iterate through the display array and highlight any paragraph with a debunking statement. It will also add a listener to these paragraphs to detect when the mouse hovers over it. When this listener is triggered, a blank floating window is opened and then has HTML written to it to display and format the debunking message. It would be preferable to load the HTMl and then open the window however this had to be done to manage DOM origin rules.
