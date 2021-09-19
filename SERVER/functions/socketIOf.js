
const disconnect = () => {
    console.log('user disconnected')
    socket.leave(busId)
}

module.exports.disconnect = disconnect

const leaveRoom = (msg)=> {
    socket.leave(busId)
    busId = undefined
}

module.exports.leaveRoom = leaveRoom

const infoPos = ({busStop,lastPerc})=> { //i get the position and i emit that to all the room
    //console.log(busStop,lastPerc)
    let timeNow = new Date()
    let timestamp = timeNow.toTimeString().split(' ')[0].substring(0,5)
    io.to(busId).emit('update',{busStop: busStop, lastPerc: lastPerc,timestamp: timestamp})
    //console.log(busId)
    try{global.activeChats[busId].push({busStop: busStop, lastPerc: lastPerc,timestamp: timestamp})}catch(e){console.log('error')}
}

module.exports.infoPos = infoPos

const bus_id = (busid) => {
    //console.log(busid)
    socket.join(busid)
    if(busState.filter(element => element.busID === busid) === []) busState.push({busID: busId, lastperc: 0})
    busId = busid

    io.to(socket.id).emit('old_messages',(global.activeChats[busId]))
}

module.exports.bus_id = bus_id