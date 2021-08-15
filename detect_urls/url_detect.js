document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('cg-run').addEventListener('click', main);
});





function main() {
    let keywords = ['Climate','climate', 'green house', 'Green House','Greenhouse']
  var queryInfo = {
    active: true,
    currentWindow: true
  };

 chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var title = tab.title
    alert(title)

    let i = 0
    var stat = 0

    while (i < keywords.length)
    {
        if (title.includes(keywords[i])) { stat += 1}
        i += 1
    }


    alert(stat)
  });}

