//...................................require.........................................
const express =             require('express')
const http =                require('http')
const mongoose =            require('mongoose')
const databaseFunctions =   require('./functions/databaseFunctions')
const {Server} =            require('socket.io')
const bodyParser =          require('body-parser')
const post =                require('./functions/POST')
const get =                 require('./functions/GET')
const path =                require('path')

                            require('dotenv').config() //FIXME: remove before final version

//.................................const..........................................
const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT || 3000

global.activeBusses = [] //require('./test') // = []
global.activeChats = {} //list of string:lists of messages

//.....................database connection...................................
mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('DB connected')
        databaseFunctions.find_the_next_bus()
        server.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`))
    })
    .catch(err => console.log(err))

//.........................socket io backend.....................................................
io.on('connection', (socket) => {
    let busId;
    console.log('user has connected')
    socket.on('bus-id',(busid) => {
        //console.log(busid)
        socket.join(busid)
        busId = busid
    
        io.to(socket.id).emit('old_messages',(global.activeChats[busId]))
    })
    socket.on('infopos',({busStop,lastPerc})=> { //i get the position and i emit that to all the room
        //console.log(busStop,lastPerc)
        let timeNow = new Date()
        let timestamp = timeNow.toTimeString().split(' ')[0].substring(0,5)
        io.to(busId).emit('update',{busStop: busStop, lastPerc: lastPerc,timestamp: timestamp})
        //console.log(busId)
        try{global.activeChats[busId].push({busStop: busStop, lastPerc: lastPerc,timestamp: timestamp})}catch(e){console.log('error')}
    })
    socket.on('leaveRoom',(msg)=> {
        socket.leave(busId)
        busId = undefined
    })
    socket.on('disconnect', () => {
        console.log('user disconnected')
        socket.leave(busId)
    });
});

//......................EXPRESS.................................

app.use(express.static(path.join(__dirname,'/CLIENT'))) //FOR CSS
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',get.home)
app.get('/CURSOR',get.cursor)

app.get('/all-busses',databaseFunctions.selectAllFunction) //to view all the busses in the DB
app.get('/bus/:id',get.bus)
app.get('/aboutUs',get.aboutUs)
app.get('/aboutCursor',get.aboutCursor)

app.get('/jsonToAddToDB',get.jsonAdd)

app.post('/busPosition', post.busPosition)
app.post('/jsonToAddToDB',post.addToDB)

app.post('/activeBusses',post.activeB)