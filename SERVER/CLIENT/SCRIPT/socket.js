

const scrollbar = document.getElementById('chat')

const generateChatMessage = (busStop,lastPerc,timestamp) => {
    let string = `
    <p class="scroll__message">${timestamp} - ${lastPerc} - ${busStop}</p>
    `
    return string
}

//...............socketIO..................

const socket = io();
socket.emit('bus-id',window.location.pathname.substring(5))

socket.on('update',({busStop,lastPerc,timestamp})=> {
    scrollbar.innerHTML += generateChatMessage(busStop,lastPerc,timestamp)
})

socket.on('old_messages',(list) => {
    list.forEach(element => {
        scrollbar.innerHTML += generateChatMessage(element.busStop,element.lastPerc,element.timestamp)
    });
})

const sendPosition = () => {
    if(stop && slider_has_moved) {
        openCity(event,'second')
        socket.emit('infopos', {busStop: stop,lastPerc: output.innerText})
    }
}
