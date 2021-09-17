const express = require('express')
const app = express()
//require('dotenv').config()
const path = require('path')
const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err))

//const connectionMDB = `mongodb+srv://HeyJOe:pco123@mondodbpco.p5ltj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'CLIENT')))

app.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`))