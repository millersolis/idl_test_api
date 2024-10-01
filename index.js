// This is a quick REST API test for only 2 users with no real db

const express = require('express');
const app = express();

require('dotenv').config();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const userRouter = require('./routes/user_router');
app.use("/api/v1", userRouter);

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
 
module.exports = app; // Export the Express app