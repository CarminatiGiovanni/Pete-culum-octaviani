const express = require('express')
const app = express()
require('dotenv').config()
const {Client} = require('pg')
const path = require('path')
const fs = require('fs')

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
if(process.env.DATABASE_URL) {
    console.log(process.env.DATABASE_URL);  
    DB = new Client(
        {
            connectionString: process.env.DATABASE_URL, 
            ssl: {
                rejectUnauthorized: false,
                ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
                key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
                cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
            },
        }
    );
}
else DB = new Client(data)

app.use(express.static(path.join(__dirname, '../CLIENT')))

DB
    .connect()
    .then(() => {console.log(`PostgreSQL DB successfully connected!`); DBstate = true;})
    .catch(err => {console.log(`Unable to connect the DB`);DBstate = false;throw err})


app.listen(PORT,() => console.log(`>Server is listening on PORT: ${PORT}`))