const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const joblistings = require("./joblisting");

const app = express()
const port = process.env.PORT || 5000;

//mysql

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'password',
    database        : 'job_board'
})

app.use(express.urlencoded({extended: false})); // New

app.use("/jobs",joblistings(pool))

app.use(express.json()); // New


app.use("*", (req,res) => res.send({message: `Invalid end point.`}))
// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`))



