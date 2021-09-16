const app = require('express')()
require('dotenv').config()
const {Client} = require('pg')

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
if(process.env.PGURI) {console.log({connectionString: process.env.PGURI,ssl:true}); DB = new Client(process.env.PGURI)}
else DB = new Client(data)

//console.log(DB)

DB
    .connect()
    .then(() => {console.log(`PostgreSQL DB successfully connected!`); DBstate = true;})
    .catch(err => {console.log(`Unable to connect the DB`);DBstate = false;})


app.get('/',(req,res) => {
    if(DBstate)res.send(`Hello world! \n ${JSON.stringify(data)}`)
    else res.send(`No db connected \n ${JSON.stringify(data)}`)
})

app.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`))