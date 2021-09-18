let slider = document.getElementById("myRange");
let output = document.getElementById("value");
let slider_has_moved = false
let stop = ""

output.innerText = slider.value + '%';

slider.oninput = () => {
    output.innerText = slider.value + '%';
    slider_has_moved = true
}

//........................functions...................................

const openCity = (evt, id) => {
    let i, pages, tablinks;
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

const clickStop = (el) => {
    stop = el.id //name of the stop
    let blocks = document.getElementsByClassName("content")
    for (i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = "white";
    }
    el.style.backgroundColor = "#3adb6a"
}