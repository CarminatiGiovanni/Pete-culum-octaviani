let fermate = 2
const aggiungiItem = () =>{
    fermate++;
    $("#fermate").append(
        `
        <div>
            <label>${fermate} - Stop name:</label> &nbsp; &nbsp;&nbsp;&nbsp;<label for='appt'>HH:mm : </label><input type='time' name='orario_di_arrivo' id='orario'>
            <br>
            <input type='text' class='form-control placeholder='atop' id='fermata'>
            <br>
        </div>
        `
        )
}
const createJSON = () => {
    fermate++
    let fermateArray = document.querySelectorAll("#fermata")
    //console.log(fermateArray)
    let orari = document.querySelectorAll("#orario")
    //console.log(orari[0].value)
    let lista = []
    for(let i = 0; i < fermateArray.length; i++){
        lista.push({
            n: i,
            stop: fermateArray[i].value,
            h: orari[i].value
        })
    }
    let data = {
        id : document.querySelector('#busId').value,
        hleaves: lista[0].h,
        day: document.querySelector('#day').value,
        stops: lista
    }
    console.log(data)

    sendJsonToServer(data)
}

const address = window.location.protocol + '//' + window.location.host + '/jsonToAddToDB'

const sendJsonToServer = (json) => {

    const options = {
        method:'POST',
        body:JSON.stringify(json),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }

    fetch(address,options)//.then(() => alert('form successfully submitted')).catch(e => alert('error'))
    alert('successfully sent to the server')
    window.location.href = window.location.href
}
    