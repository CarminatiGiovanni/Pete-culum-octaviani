const Bus =                 require('./../models/bus')

let insertFunction = (req,res) => {
    // const bus = new Bus(
    //     {
    //         id:"PW236KF",
    //         hleaves:"06:30",
    //         day:"SAT", //MON TUE WEN THU FRI SAT SUN
    //         stops:[
    //             {n:0,stop:'Sorisole',h:'06:30'},
    //             {n:1,stop:'Ponteranica',h:'06:45'},
    //             {n:2,stop:'Valtesse',h:'07:15'},
    //             {n:3,stop:'Monte Rosso',h:'07:25'},
    //             {n:4,stop:'Berbenno',h:'7:45'},
    //         ],
    //         passengers:{
    //             people:11,
    //             bags:7,
    //             suitcases:2,
    //             scooters:0,
    //             prams:1,
    //             strollers:1,
    //             dogs:2
    //         }
    //     }
    //)


    bus.save()
        .then((result) => {res.send(result)})
        .catch(err => console.log(err))
}

let selectAllFunction = (req,res) => {
    Bus.find()
        .then(result => res.send(result))
        .catch(err => {console.log(err); res.send('error')})
}

const days = ['SUN','MON','TUE','WEN','THU','FRI','SAT']

let find_the_next_bus = () => {
    Bus.find()
        .then(result => {
            let found_timeout = false
            let today = new Date()
            let startDay = today.getDay()
            while(found_timeout === false){
                let listNearestDay = result.filter(el => el.day === startDay)
                listNearestDay.forEach(element => {
                    if(startDay === days.indexOf(element.day)){
                        if(comparaOre()){} //TODO: cerca il pullman successivo comparando l'orario
                    }
                });
                startDay++
                if(startDay === 7) startDay = 0
            }
        })
        .catch(err => {console.log(err); res.send('error')})
}

module.exports.find_the_next_bus = find_the_next_bus

module.exports.insertFunction = insertFunction
module.exports.selectAllFunction = selectAllFunction