var $ = require('jquery')
var hotkeys = require('hotkeys-js')

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

// Initial variables and sets
var mode = 'A';
var macro = '1';

$('.macro').click(function() {
    resetField();
    $('.macro').css('background-color', '')
    $(this).css('background-color', 'grey')
    var args = {
        0: this.id,
        1: document.getElementById(this.id).textContent
    }
    macro = this.id
    addLabel(args)
});

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

var firing
var ctrl = false
var shift = false
var alt = false

$('#submit').click(modifyJSON)
$('#check').mousedown(showJSON)
$('#check').mouseup(resetJSON)
$('#save').click(() => {
    if(firing)
        return;
    saveText(JSON.stringify(macrosJSON), 'file.json')
})

$('#ctrl').click(() => {
    if (!ctrl) {
        $("#ctrl").css('background-color', 'grey')
        ctrl = true;
    } else {
        $("#ctrl").css('background-color', '')
        ctrl = false;
    }
})

$('#shift').click(() => {
    if (!shift) {
        $("#shift").css('background-color', 'grey')
        shift = true;
    } else {
        $("#shift").css('background-color', '')
        shift = false;
    }
})

$('#alt').click(() => {
    if (!alt) {
        $("#alt").css('background-color', 'grey')
        alt = true;
    } else {
        $("#alt").css('background-color', '')
        alt = false;
    }
})

function addLabel(args) {
    if (mode) {
        document.getElementById('button').innerHTML = args[1]
    }
}

function modifyJSON() {
    var myValue = document.getElementById('customize').value
    myValue = myValue.toUpperCase()
    macrosJSON[mode][macro] = {
        "key": myValue,
        "ctrl": ctrl,
        "shift": shift,
        "alt": alt
    }
    console.log(macrosJSON)
}

function showJSON() {
    var idArray = [macrosJSON];
    $('.macro').each(function () {
        idArray.push(this.id);
    });
    for(i=1;i<idArray.length+1;i++) {
        if (macrosJSON[mode][i]["key"]) {
            var thisMacro = macrosJSON[mode][i]["key"]
            if (thisMacro.length) {
                document.getElementById(i).innerHTML = thisMacro
            }
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

function resetField() {
    document.getElementById('customize').value = ''


}
  //hotkeys('*', function(event, handler) {
  //  console.log(event.target)
  //  document.getElementById('customize').value = handler.key
  //});