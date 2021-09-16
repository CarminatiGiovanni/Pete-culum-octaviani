const app = require('express')()
require('dotenv').config()
const {Client} = require('pg')

const PORT = process.env.PORT || 3000
let DBstate = false;

const DB = new Client()
DB
    .connect()
    .then(() => {console.log(`PostgreSQL DB successfully connected!`); DBstate = true;})
    .catch(err => {console.log(`Unable to connect the DB`);DBstate = false;})


app.get('/',(req,res) => {
    if(DBstate)res.send('hello world!')
    else res.send('No db connected')
})

app.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`))