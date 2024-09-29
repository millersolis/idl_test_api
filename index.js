// This is a quick REST API test for only 2 users with no real db

const express = require('express');
const app = express();
const fs = require('fs');

// const PORT = 8080;
const PORT = process.env.PORT || 5000;

app.use(express.json());

var server = app.listen(
    PORT,
    function() {
        var host = server.address().address;
        var port = server.address().port;
        console.log("IDL test running at http://%s:%s", host, port);
})

app.get('/', (req,res) => {
    res.status(200).send({
        message: 'ok'
    })
})

///////////////////// VARIABLES /////////////////////
const usersFile = __dirname + "/" + "users.json";

const IDLE_STR = 'idle';
const AWAY_STR = 'away';
const UNKNWN_STR = 'unknown';


////////////////////// GET ////////////////////////

// Endpoint to Get a list of users
app.get('/getUsers', (req, res) => {
    fs.readFile(
        usersFile,
        'utf8',
        function (err, data) {
            if (err) throw err;
            res.end(data);
    });
    
})

// Endpoint to get user status by username
app.get('/status/:username', function (req, res) {
    const { username } = req.params;

    // Retrieve existing user list
    fs.readFile(
        usersFile,
        'utf8',
        function (err, data) {
            if (err) throw err;
            var users = JSON.parse( data );
            var user = users[username] 
            res.end( JSON.stringify(user));
    });
 })


 ////////////////////// POST ////////////////////////

// Endpoint to set user status to idle
app.post('/idle/:username', function (req, res) {
    const { username } = req.params;
    
    // Retrieve existing user list
    fs.readFile(
        usersFile,
        'utf8',
        function (err, data) {
            data = JSON.parse( data );
            data[username]["status"] = IDLE_STR;

            // Write modified data to json file
            fs.writeFile(
                usersFile,
                JSON.stringify(data),
                function (err) {
                    if (err) throw err;
                    res.end(JSON.stringify(data));
                })
    });
 })

 // Endpoint to set user status to idle
app.post('/away/:username', function (req, res) {
    const { username } = req.params;
    
    // Retrieve existing user list
    fs.readFile(
        usersFile,
        'utf8',
        function (err, data) {
            data = JSON.parse( data );
            data[username]["status"] = AWAY_STR;

            // Write modified data to json file
            fs.writeFile(
                usersFile,
                JSON.stringify(data),
                function (err) {
                    if (err) throw err;
                    res.end(JSON.stringify(data));
                })
    });
 })

 
module.exports = app; // Export the Express app