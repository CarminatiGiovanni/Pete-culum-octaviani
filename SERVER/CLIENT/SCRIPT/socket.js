

const scrollbar = document.getElementById('chat')

function generateChatMessage (busStop,lastPerc,timestamp) {
    
    let string = `
    <p class="scroll__message">${timestamp} - ${lastPerc} - ${busStop}</p>
    `
    return string
}

const socket = io();
socket.emit('bus-id',window.location.pathname.substring(5))

//for(let i = 0; i< 30;i ++)emit_position_2() //FIXME: decommentami

socket.on('update',({busStop,lastPerc,timestamp})=> {
    scrollbar.innerHTML += generateChatMessage(busStop,lastPerc,timestamp)
})

///test
function emit_position_2(){
    socket.emit('infopos',{busStop:'Piazza Brembana',lastPerc: Math.floor( Math.random() * 100) })    
}

function sendPosition(){
    if(stop && slider_has_moved) {
        openCity(event,'second')
        socket.emit('infopos', {busStop: stop,lastPerc: output.innerText})
    }
}
