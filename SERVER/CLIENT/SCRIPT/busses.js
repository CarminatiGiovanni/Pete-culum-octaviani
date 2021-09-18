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
    <div class="card__findbus" id="${obj.id}" onclick="redirect(this)" title="bus-1">
        <div class="card__copy1">
            <h3 style="color:orange;font-style:bold">${start}</h3>
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
                    //console.log(r)
                    const listActiveBusses = r.busses
                    //console.log(listActiveBusses)
                    listActiveBusses.forEach(element => {
                        section.innerHTML += createCard(element)
                    })
                })
        )
        .catch(err => console.log(err))
}