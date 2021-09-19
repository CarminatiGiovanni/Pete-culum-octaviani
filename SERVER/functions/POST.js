const busPosition = (req,res) => {
    const [busSearched] = global.activeBusses.filter(el => el.id === req.body.id)
    if(busSearched === undefined) res.json({'error' : 'error'})
    else res.json(busSearched)
}

module.exports.busPosition = busPosition

const addToDB = (req,res) => {
    if(req.body.pw === process.env.PWinsert) insertFunctions.insertBus(req.body.data)
    res.status(200)
}
module.exports.addToDB = addToDB

const activeB = (req,res) => {
    res.json({'busses':global.activeBusses})
}
module.exports.activeB = activeB