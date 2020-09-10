var $ = require('jquery')

var macrosJSON;
$.ajax({
    async: false,
    url: './macros.json',
    dataType: 'json',
    success: function(json) {
    macrosJSON = json
    }
})
console.log(macrosJSON)
var mode = 'A';
var macro = '1';
$('#a').css('background-color', 'red')
$('#1').css('background-color', 'grey')
document.getElementById('mode').innerHTML = mode
document.getElementById('button').innerHTML = '1'

$('.macro').click(function() {
    document.getElementById('customize').value = ''
    $('.macro').css('background-color', '')
    $(this).css('background-color', 'grey')
    var args = {
        0: this.id,
        1: document.getElementById(this.id).textContent
    }
    macro = this.id
    addLabel(args)
});

$('.modifier').click(function() {
    $('.modifier').css('background-color', '')
    $(this).css('background-color', 'grey')
})

$('.mode').click(function () {
    document.getElementById('customize').value = ''
    $('.mode').css('background-color', '')
    switch(this.id) {
        case 'a':
            mode = 'A'
            $(this).css('background-color', 'red')
            document.getElementById('mode').innerHTML = mode
            break;
        case 'b':
            mode = 'B'
            $(this).css('background-color', 'green')
            document.getElementById('mode').innerHTML = mode
            break;
        case 'c':
            mode = 'C'
            $(this).css('background-color', 'blue')
            document.getElementById('mode').innerHTML = mode
            break;
        case 'd':
            mode = 'D'
            $(this).css('background-color', 'yellow')
            document.getElementById('mode').innerHTML = mode
            break;
    }
})

$('#submit').click(modifyJSON)
$('#check').mousedown(showJSON)
$('#check').mouseup(resetJSON)

var firing
$('#save').click(() => {
    if(firing)
        return;
    saveText(JSON.stringify(macrosJSON), 'file.json')
})
//$('#save').click(saveText(macrosJSON, 'file.json'))

function addLabel(args) {
    if (mode) {
        document.getElementById('button').innerHTML = args[1]
    }
}

function modifyJSON() {
    var myValue = document.getElementById('customize').value
    myValue = myValue.toUpperCase()
    macrosJSON[mode][macro] = myValue
    console.log(macrosJSON)
}

function showJSON() {
    var idArray = [];
    $('.macro').each(function () {
        idArray.push(this.id);
    });
    for(i=1;i<idArray.length+1;i++) {
        var thisMacro = macrosJSON[mode][i]
        if (thisMacro.length != undefined) {
            document.getElementById(i).innerHTML = thisMacro
        }
    }
}

function resetJSON() {
    var idArray = [];
    $('.macro').each(function () {
        idArray.push(this.id);
    });
    for(i=1;i<idArray.length+1;i++) {
        switch(i) {
            case 10:
                document.getElementById(i).innerHTML = '*'
                break;
            case 11:
                document.getElementById(i).innerHTML = '0'
                break;
            case 12:
                document.getElementById(i).innerHTML = '#'
                break;
            default:
                document.getElementById(i).innerHTML = i
                break;
        }
    }
}

function saveText(text, filename){
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click()
  }