

function loadStops(){
const address = window.location.protocol + '//' + window.location.host + '/busPosition'
const timeline = document.getElementById('timeline_bus')

const options = {
    method:'POST',
    body:JSON.stringify({id:window.location.pathname.substring(5)}),
    headers: {"Content-type": "application/json; charset=UTF-8"}
}

function stringTimeline({stop,h,n}){
    let lr = n % 2 == 0 ? 'left' : 'right'
    let string = `
        <div class="container ${lr}">
            <div class="content" onclick="clickStop(this)" id="${stop}">
                <h4>${stop} - ${h}</h4>
            </div>
        </div>
    `
    return string
}

function generateThePage(bus){
    for(let i = 0; i < bus.stops.length;i++){
        timeline.innerHTML += stringTimeline(bus.stops[i])
    }
}

fetch(address,options)
    .then((p => 
        p.json()
        .then(r => {
            generateThePage(r)
        })
    ))
    .catch(e => console.log(e))
}