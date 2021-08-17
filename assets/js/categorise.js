document.addEventListener('run_categorise', function (event) {
    var paragraph = event.detail
    if (paragraph.toString().includes('IPCC') == true) {
        var cat = '1.1'
        var return_categorise = new CustomEvent('return_cat', {'detail': cat})
        document.dispatchEvent(return_categorise)

    }
})