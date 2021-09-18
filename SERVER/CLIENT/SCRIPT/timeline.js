
const char = document.getElementById('chat')
const address = window.location.protocol + '//' + window.location.host + '/busPosition'

const options = {
    method:'POST',
    body:JSON.stringify({id:window.location.pathname.substring(5)}),
    headers: {"Content-type": "application/json; charset=UTF-8"}
}

function generateThePage(bus){
    //TODO: these are the stops for the tree
}

fetch(address,options)
    .then((p => 
        p.json()
        .then(r => {
            console.log(r)
            generateThePage(r)
        })
    ))
    .catch(e => console.log(e))