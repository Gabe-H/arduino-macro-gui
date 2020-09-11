var $ = require('jquery')

var xtras = false;
var fkeys = false;

$(".xtras").css('display', 'none')
$(".f-keys").css('display', 'none')
$('#a').css('background-color', 'red')
$('#1').css('background-color', 'grey')
document.getElementById('mode').innerHTML = mode
document.getElementById('button').innerHTML = '1'

var firing = false;

$('#toggle').click(() => {
    if (firing)
    return;
    console.log('toggle clicked' + xtras)
    if (xtras) {
        $(".xtras").css('display', 'none')
        xtras = false;
    } else {
        $(".xtras").css('display', '')
        xtras = true;
    }
})

$('#toggle-f').click(() => {
    if (firing)
    return;
    if (fkeys) {
        $(".f-keys").css('display', 'none')
        fkeys = false;
    } else {
        $(".f-keys").css('display', '')
        fkeys = true;
    }
})

$('.extra').click(function() {
    switch (this.id) {
        case 'ctrl':
            ctrl = true;
            break;
        case 'alt':
            alt = true;
            break;
        case 'shift':
            shift = true;
            break;
        default:
            document.getElementById('customize').value = this.id
            break;
    }
})