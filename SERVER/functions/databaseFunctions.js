const ArrayList = require('arraylist')
const Bus =                 require('./../models/bus')

const insertFunction = (req,res) => {
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

const selectAllFunction = (req,res) => {
    Bus.find()
        .then(result => res.send(result))
        .catch(err => {console.log(err); res.send('error')})
}

const days = ['SUN','MON','TUE','WEN','THU','FRI','SAT'] //local

global.timeout = undefined

global.orderedListOfBus = new ArrayList;

const addToActiveBusses = () => {
    console.log('called the callback function')


    //TODO: push pop
    //global.activeBusses.push(bus) //FIXME: uncomment

    return find_the_next_bus()
}

const findDateOfBusoObject = (bus) => {
    let hbus = new Date()
    const today = new Date()
    const todayWeek = today.getDay()
    let conta = 0
    for(let i = todayWeek; days[i] !== bus.day; i++ ) {
        if(i == 6) i = -1;
        conta ++
        if(conta == 8)throw 'days error'
    }
    hbus.setDate(today.getDate() + conta)
    let [HH,mm] = bus.hleaves.split(':')
    hbus.setHours(parseInt(HH),parseInt(mm),0)
    return hbus
}

const find_the_next_bus = () => {

    function sumWeek(a,b){ //for iterate days
        if(a + b >= 7 )return a +b -7
        else return a+b
    }

    Bus.find()
        .then(result => {
            result.forEach(element => {
                global.orderedListOfBus.add({date:findDateOfBusoObject(element),bus: element})
            });

            global.orderedListOfBus.sort((a,b) => {return a.date - b.date})

            setTimeout(addToActiveBusses(),global.orderedListOfBus.date - today)

            //global.orderedListOfBus.forEach(a => console.log(a.date.toString()))

            // let today = new Date()  //get the current date
            // let nextBus = {bus: undefined, h: today} //the main role of this function is to store this information
            // let found_timeout = false
            // const startDay = today.getDay() //get the current week day
            // let counterDays = 0 //how many days the checker has moved on
            // let alreadyCheckedToday = false
            // while(found_timeout === false){ //the worst case is when the counterDays has changed for 7 times (checked all the busses for the week)
            //     let listNearestDay = result.filter(el => el.day === days[sumWeek(startDay,counterDays)]) //returns a list of busses of the day startday
            //     //console.log(listNearestDay)
            //     listNearestDay.forEach(element => { //iterate the list
            //         let elementDate = new Date() ///YY-MM-DD HH-mm
            //         elementDate.setDate(today.getDate() + counterDays) //element days is equal to today + counter
            //         let arr = element.hleaves.split(':') //because element.h contains a string 'HH:mm' i split it and take out values ['HH','mm']
            //         elementDate.setHours(parseInt(arr[0]),parseInt(arr[1]),00) //setHours(HH,mm)
            //         if(today.getDate() === elementDate.getDate() && today.getMonth() === elementDate.getMonth()  && alreadyCheckedToday===false){ //if is the same day i check if it has already passed, alreadyCheckedToday===false is for the worst case
            //             if(today<elementDate){ //if the bus hasn't already taken off
            //                 if(nextBus.bus === undefined) nextBus = {bus: element, h: elementDate} //element day here is > than today and if it is the first value it assigns
            //                 else if(elementDate < nextBus.h) nextBus = {bus: element, h: elementDate} //else check if is better than the one before
            //             }
            //         }
            //         else{
            //             if(nextBus.bus === undefined) nextBus = {bus: element, h: elementDate}
            //             else if(nextBus.h > elementDate) nextBus = {bus: element, h: elementDate} //else check if is better than the one before
            //         }
            //     });

            //     if(nextBus.bus !== undefined) found_timeout = true

            //     alreadyCheckedToday = true //after the first check
            //     counterDays ++
            //     if(counterDays > 7) break //this means that there are no busses
            
            // }

            // if(nextBus.bus === undefined) console.log('There are no busses in the DB please update')
            // else{
            //     console.log("nextBus:",nextBus.bus.id, 'h: ',nextBus.h.toString())
            //     if(global.timeout !== undefined) clearTimeout(global.timeout)
            //     global.timeout = setTimeout(() => addToActiveBusses(nextBus.bus),(nextBus.h - today))
            // } //TODO: check if there are more busses at the same hour

        })
        .catch(err => {console.log(err); res.send('error')})
}

module.exports.find_the_next_bus = find_the_next_bus
module.exports.insertFunction = insertFunction
module.exports.selectAllFunction = selectAllFunction