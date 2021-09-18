const Bus =                 require('./../models/bus')
const Vespasianus =         require('./../models/vespasianus')
const Fountain =            require('./../models/fountain')

const insertBus = (req,res) => {
    const bus = new Bus(
        {
            id:"PW236KF",
            hleaves:"06:30",
            day:"SAT", //MON TUE WEN THU FRI SAT SUN
            stops:[
                {n:0,stop:'Sorisole',h:'06:30'},
                {n:1,stop:'Ponteranica',h:'06:45'},
                {n:2,stop:'Valtesse',h:'07:15'},
                {n:3,stop:'Monte Rosso',h:'07:25'},
                {n:4,stop:'Berbenno',h:'7:45'},
            ]
        }
    )


    bus.save()
        .then((result) => {res.send(result)})
        .catch(err => console.log(err))
}

const insertFountain = (req,res) => {
    const fountain = new Fountain(
        {
            id:"VS1234",
            coordY:45.4145,
            coordX:9.4001,
            closed:false,
            potable:true,
            description: "Near the bus station in the middle of the square"
        }
    )


    fountain.save()
        .then((result) => {res.send(result)})
        .catch(err => console.log(err))
}

const insertVespasianus = (req,res) => {
    const vespasianus = new Vespasianus(
        {
            id:"VS1234",
            coordY:45.4145,
            coordX:9.4001,
            forDisable:true,
            description: "Near the bus station"
        }
    )


    vespasianus.save()
        .then((result) => {res.send(result)})
        .catch(err => console.log(err))
}

module.exports.insertBus = insertBus
module.exports.insertVespasianus = insertVespasianus
module.exports.insertFountain = insertFountain