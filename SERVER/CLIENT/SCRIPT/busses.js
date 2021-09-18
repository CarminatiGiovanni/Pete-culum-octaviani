
function loadBusses(){
    const section = document.getElementById('bussesCards')
    //console.log(window.location.href + '/activeBusses')
    const options = {
        method:'POST',
        body:JSON.stringify({'hello':'i\'m the client'}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }

    let address = (window.location.protocol+'//'+window.location.host) 

    fetch(address + '/activeBusses',options)
        .then(result => 
            result.json()
                .then((j) => console.log(j))
        )
        .catch(err => console.log(err))
}