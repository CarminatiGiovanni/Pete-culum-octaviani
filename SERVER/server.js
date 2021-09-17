const express = require('express')
const app = express()
require('dotenv').config()
const {Client} = require('pg')
const path = require('path')

const PORT = process.env.PORT || 3000
let DBstate = false;

const data =     {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
}

let DB = null;
//let DB = new Client(data)
if(process.env.DATABASE_URL) {console.log(process.env.DATABASE_URL); DB = new Client({connectionString: process.env.DATABASE_URL,ssl:true});}
else DB = new Client(data)

app.use(express.static(path.join(__dirname, '../CLIENT')))

//console.log(DB)

DB
    .connect()
    .then(() => {console.log(`PostgreSQL DB successfully connected!`); DBstate = true;})
    .catch(err => {console.log(`Unable to connect the DB`);DBstate = false;throw err})


// app.get('/',(req,res) => {
//     //if(DBstate)res.send(`Hello world! \n ${JSON.stringify(data)}`)
//     //else res.send(`No db connected \n ${JSON.stringify(data)}`)
//     //const pathf = path.join(-__dirname,'../CLIENT/index.html')
//     //console.log(pathf)
//     //res.sendFile(pathf);
    
//     const pathf = (path.join(__dirname, '../CLIENT/index.html'))
//     res.sendFile(pathf)
// })

app.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`))