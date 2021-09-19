//...................................require.........................................
const express =             require('express')
const http =                require('http')
const path =                require('path')
const mongoose =            require('mongoose')
const databaseFunctions =   require('./functions/databaseFunctions')
const {Server} =            require('socket.io')
const bodyParser =          require('body-parser')
const post =                require('./functions/POST')
const so =                  require('./functions/socketIOf')
const get =                 require('./functions/GET')

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

        //generateAndSave()

        server.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`))
    })
    .catch(err => console.log(err))

//.........................socket io backend.....................................................
io.on('connection', (socket) => {
    let busId;
    console.log('user has connected')
    socket.on('bus-id',so.bus_id)
    socket.on('infopos',so.infoPos)
    socket.on('leaveRoom',so.leaveRoom)
    socket.on('disconnect', so.disconnect);
});

//......................EXPRESS.................................

app.use(express.static(path.join(__dirname,'/CLIENT'))) //FOR CSS
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',get.home)
app.get('/CURSOR',get.cursor)

app.get('/all-busses',databaseFunctions.selectAllFunction) //to view all the busses in the DB
app.get('/bus/:id',get.bus)

app.get('/jsonToAddToDB',get.jsonAdd)

app.post('/busPosition', post.busPosition)
app.post('/jsonToAddToDB',post.addToDB)

app.post('/activeBusses',post.activeB)