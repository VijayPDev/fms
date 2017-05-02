/* The server file for the backend. Uses the express middleware framework */

import express from 'express';
var input = require('./entities.json'); //Read the input JSON file
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())
app.use('/', express.static('public'));

//API to send entities to the front end
app.get('/api/entities', function(req,res) {
    res.send(input);
})

// API to receive values from the frontend
app.post('/api/values', function(req,res) {
    var requestBody = req.body;
    var setValues = requestBody.setValues;
    res.end('Success');
})

//Runs on port 3000. Open localhost:3000 to view the results
app.listen(process.env.PORT || 3000, function() {
    console.log('App listening on port 3000');
});