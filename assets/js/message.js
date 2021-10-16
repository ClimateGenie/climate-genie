// Create an event listener within the popup to check when the content is loaded (incorporates updates)
document.addEventListener('DOMContentLoaded', function () {

    backgroundPage = chrome.extension.getBackgroundPage();


    // Random Genie Image
    var path = '/assets/Icons/Avatars',
    imgs = ['preach.png','grr.png','question.png','run.png','superman.png', 'think.png','thumbs-up.png','woo.png'],
    i = Math.floor(Math.random()*imgs.length);
    document.getElementById('el').src = path+'/' +imgs[i]

});