// This is a quick REST API test for only 2 users with no real db

const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(
    PORT,
    () => console.log(`IDL test running on http://localhost:${PORT}`)
)

app.get('/', (req,res) => {
    res.status(200).send({
        message: 'ok'
    })
})

///////////////////// VARIABLES /////////////////////

const IDLE_STR = 'idle';
const AWAY_STR = 'away';
const UNKNWN_STR = 'unknown';

var imane = {'username': 'imane', 'status': AWAY_STR};
var miller = {'username': 'miller', 'status': AWAY_STR};


////////////////////// GET ////////////////////////

// Get user status
app.get('/status/:username', (req, res) => {
    const { username } = req.params;

    var user_status = UNKNWN_STR;
    var user_found = false;

    // Check username and get status
    if (username == imane.username) {
        user_status = imane.status;
        user_found = true;
    }
    else if (username == miller.username) {
        user_status = miller.status;
        user_found = true;
    }

    // Send response
    if (user_found) {
        res.status(200).send({
            username: `${username}`,
            status: `${user_status}`
        })
    }
    else {
        res.status(404).send({
            message: 'User not found'
        })
    }

});


////////////////////// POST ////////////////////////

// Modify user status to idle
app.post('/idle/:username', (req,res) => {
    const { username } = req.params;

    var user_found = false;
    var user_status = UNKNWN_STR;

    // Check username and set status
    if (username == imane.username) {
        imane.status = IDLE_STR;
        user_status = imane.status;
        user_found = true;
    }
    else if (username == miller.username) {
        miller.status = IDLE_STR;
        user_status = miller.status;
        user_found = true;
    }

    // Send response
    if (user_found) {
        res.status(200).send({
            username: `${username}`,
            status: `${user_status}`
        })
    }
    else {
        res.status(404).send({
            message: 'User not found'
        })
    }
    
})

// Modify user status to away
app.post('/away/:username', (req,res) => {
    const { username } = req.params;

    var user_found = false;
    var user_status = UNKNWN_STR;

    // Check username and set status
    if (username == imane.username) {
        imane.status = AWAY_STR;
        user_status = imane.status;
        user_found = true;
    }
    else if (username == miller.username) {
        miller.status = AWAY_STR;
        user_status = miller.status;
        user_found = true;
    }

    // Send response
    if (user_found) {
        res.status(200).send({
            username: `${username}`,
            status: `${user_status}`
        })
    }
    else {
        res.status(404).send({
            message: 'User not found'
        })
    }
})