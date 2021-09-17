const express = require('express')
const app = express()
require('dotenv').config() //FIXME: remove before final version
const path = require('path')
const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err))

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'CLIENT')))

app.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`))