const busPosition = (req,res) => {
    const [busSearched] = global.activeBusses.filter(el => el.id === req.body.id)
    if(busSearched === undefined) res.json({'error' : 'error'})
    else res.json(busSearched)
}

module.exports.busPosition = busPosition