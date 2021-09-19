const path =                require('path')

const home = (req,res) => {res.sendFile(path.join(__dirname,'../CLIENT/index.html'))}
module.exports.home = home

const cursor = (req,res) => {res.sendFile(path.join(__dirname,'../CLIENT/HTML/bus_list.html'))}
module.exports.cursor = cursor

const bus = (req,res) => {res.sendFile(path.join(__dirname,'../CLIENT/HTML/bus_position.html'))}
module.exports.bus = bus

const jsonAdd = (req,res) => res.sendFile(path.join(__dirname,'CLIENT','HTML','insert.html'))
module.exports.jsonAdd = jsonAdd

const aboutUs = (req,res) => res.sendFile(path.join(__dirname,'../CLIENT/HTML/About_us.html'))
module.exports.aboutUs = aboutUs

const aboutCursor = (req,res) => res.sendFile(path.join(__dirname,'../CLIENT/HTML/about_cursor.html'))
module.exports.aboutCursor = aboutCursor