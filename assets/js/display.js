document.addEventListener('run_display', function (e) {
    var cat = e.detail
    var index = cat.split('.')

    var main = index[0]
    var sub = index[1]

    var responses = [['0.0', '0.1'], ['1.0', 'this is false']]

    var message = responses[main][sub]

    alert(message)


})