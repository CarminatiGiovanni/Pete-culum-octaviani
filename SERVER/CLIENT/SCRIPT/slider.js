var slider = document.getElementById("myRange");
var output = document.getElementById("value");
var slider_has_moved = false
output.innerText = slider.value + '%';

slider.oninput = function() {
    output.innerText = this.value + '%';
    slider_has_moved = true
}


function openCity(evt, id) {
    var i, pages, tablinks;
    pages = document.getElementsByClassName("page");
    for (i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(id).style.display = "block";
    evt.currentTarget.className += " active";
}
var stop = ""
function clickStop(el){
    stop = el.id //name of the stop
    var blocks = document.getElementsByClassName("content")
    for (i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = "white";
    }
    el.style.backgroundColor = "#3adb6a"
}