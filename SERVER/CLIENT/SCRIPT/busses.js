let createCard = (obj) => {
    const start = obj.stops[0].stop
    const stop = obj.stops[obj.stops.length-1].stop
    let stops = ''
    obj.stops.forEach(element => {
        stops += element.stop + '<br>'
    });
    const hleave = obj.stops[0].h
    const harrive = obj.stops[obj.stops.length-1].h

    let string = 
    `  
    <div class="card__findbus" id="bus-1" onclick="redirect(this)" title="bus-1">
        <img class="card__image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Bus_stop_symbol.svg/1112px-Bus_stop_symbol.svg.png" alt="Nature">
        <div class="card__copy">
            <h3 style="color:lime;font-style:bold">${start}</h3>
            <h3 style="color:red;font-style">${stop}</h3>
            <h2>${hleave} - ${harrive}</h2>
            <p>${stops}</p>
        </div>
    </div>
    `
    return string
}


function loadBusses(section){
    console.log(section)

    //const section = document.getElementById('cardBusses')
    //console.log(window.location.href + '/activeBusses')
    const options = {
        method:'POST',
        //body:JSON.stringify({'hello':'i\'m the client'}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }

    let address = (window.location.protocol+'//'+window.location.host) 

    fetch(address + '/activeBusses',options)
        .then(result => 
            result.json()
                .then((r) => {
                    const listActiveBusses = r.busses.data
                    console.log(listActiveBusses)
                    listActiveBusses.forEach(element => {
                        section.innerHTML += createCard(element)
                    })
                })
        )
        .catch(err => console.log(err))
}