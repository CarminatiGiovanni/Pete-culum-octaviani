const Bus =                 require('./../models/bus')

const insertBus = (b) => {

    const bus = new Bus(b)

    bus.save()
        .then((result) => {res.send(result)})
        .catch(err => console.log(err))
}

module.exports.insertBus = insertBus