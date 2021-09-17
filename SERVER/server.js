//...................................require.........................................
const express =             require('express')
const http =                require('http')
const path =                require('path')
const mongoose =            require('mongoose')
const Bus =                 require('./models/bus')
const databaseFunctions =   require('./functions/databaseFunctions')
const {Server} =            require('socket.io')
                            require('dotenv').config() //FIXME: remove before final version

//.................................const..........................................
const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT || 3000

const busState = [] //collect the number of people percent {busID:String,perc:Number}

//.....................database connection...................................
mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('DB connected')
        databaseFunctions.find_the_next_bus()
        //app.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`)) //FIXME: think about this way to lauch the server
    })
    .catch(err => console.log(err))

//.........................socket io backend.....................................................
io.on('connection', (socket) => {
    let busId;

    socket.on('bus-id',(busid) => {
        socket.join(busid)
        if(busState.filter(element => element.busID === busid) === []) busState.push({busID: busId, lastperc: 0})
        busId = busid
    })

    socket.on('infopos',({busStop,lastPerc})=> { //i get the position and i emit that to all the room
        console.log(busStop,lastPerc)
        io.to(busId).emit('update',{busStop: busStop, lastPerc: lastPerc})
    })

    socket.on('leaveRoom',(msg)=> {
        socket.leave(busid)
        busid = undefined
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
        socket.leave(busid)
    });
});

//......................EXPRESS.................................
app.use(express.static(path.join(__dirname, 'CLIENT')))

app.get('/a',databaseFunctions.insertFunction)
app.get('/all-busses',databaseFunctions.selectAllFunction)


server.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`))