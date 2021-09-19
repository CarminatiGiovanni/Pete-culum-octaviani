//const populateBusses = () => {

const Bus = require("../models/bus")

    const createBusJson = (startID,counter,endID,datatime,stops = [], total_minutes) => {

        //..................................functions............................................

        const getID = (start,counter,end) => {
            let id = start + `${counter}` + end
            return id
        }
    
        const getHleaves = (data) => {
            //const data = new Date(datatime)
            let h = data.toTimeString().split(' ')[0].substring(0,5)
            return h
        }
    
        const getDay = (data) => {
            //const data = new Date(datatime)
            const week = ['SUN','MON','TUE','WEN','THU','FRI','SAT']
            return week[data.getDay()]
        }
    
        const setStops = (stops = [], data, total_time_millis) => {
            //console.log(datatime)
            //const [W,MM,DD,YYYY,H,...b] = datatime.split(' ')
            //const data = new Date(`${YYYY}-${MM}-${DD} ${H}`)
            //console.log(data.toString())
    
            const timeNextStop = Math.floor(total_time_millis / stops.length)
            let lStop = []
            let n_prog = 0
            stops.forEach(el => {
                let obj = {}
                obj['n'] = n_prog
                obj['stop'] = el
                let hStop = new Date(data.getTime() + timeNextStop * n_prog)
                //hStop.setMilliseconds(hStop.getMilliseconds() + timeNextStop * n_prog)
                //console.log("stop: ", el, "datatime: ",data.toString(), 'hStop', hStop.toString().split(' ')[4].substring(0,5))
                obj['h'] = hStop.toString().split(' ')[4].substring(0,5)
                lStop.push(obj)
                n_prog ++
            })
            return lStop
        }

        //.........................json creation...................................

        let json = {}
        json['id'] = getID(startID,counter,endID)
        json['hleaves'] = getHleaves(datatime) 
        json['day'] = getDay(datatime)
        json['stops'] = setStops(stops,datatime,total_minutes * 60000)

        return json
    }

    //module.exports.createBusJson = createBusJson

    //create list of busses object //start every 
const generateAndSave = () => { 

    const minutes = 60
    const startingDate = new Date('2021-09-20 4:02')
    let dayDate = new Date('2021-09-20 4:02')
    const midnight = new Date('2021-09-20 19:00')
    let lastDate = new Date('2021-09-20 19:00')
    let counter = 100
    const stops = [
       'Bergamo',
       'Villa D\'Alme',
       'Almenno S Salvatore',
       'Almenno S Bartolomeo',
       'S Omobono',
       'Berbenno'
    ]

    for(let i = 0;i<7;i++){
        
        while(dayDate < lastDate){
            const json = createBusJson('JJ',counter,'KK',dayDate,stops,minutes)

            const bus = new Bus(json)
            bus.save().then(r => console.log('successfull: ',json.id)).catch(e => console.log(e))

            dayDate.setMinutes(dayDate.getMinutes() + minutes + 30)
            console.log(dayDate.toString())
            counter++
            
        }

        dayDate = new Date(startingDate)
        lastDate = new Date(midnight)

        dayDate.setDate(dayDate.getDate()+i+1)
        lastDate.setDate(lastDate.getDate()+i+1)
    }



}

module.exports = generateAndSave