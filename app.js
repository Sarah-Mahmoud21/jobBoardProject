//Creating an instance of the Express application:
const express = require('express')//The Express framework for creating the server.
const bodyParser = require('body-parser')// Middleware for parsing request bodies.
const mysql = require('mysql')
const joblistings = require("./joblisting");
const employers = require("./employers");
const jobseekers = require("./jobseekers");
const applications = require('./applications');
const Authoemployer = require('./Authoemployer');

const app = express()
const port = process.env.PORT || 5000;

//mysql
//Creating a MySQL connection pool:
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'job_board'
})
//Parsing JSON request bodies
app.use(express.json()); // New
//Parsing URL-encoded request bodies
app.use(express.urlencoded({extended: false})); // New
//Mounting the joblistings module at the /jobs endpoint:
app.use("/jobs",joblistings(pool))
app.use("/employers",employers(pool))
app.use("/seekers", jobseekers(pool))
app.use('/applications', applications(pool));
app.use('/authoemployer' , Authoemployer(pool));


app.use("*", (req,res) => res.send({message: `Invalid end point.`}))
// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`))



