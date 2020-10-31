//Budget API
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const chartModel = require("./models/chart_schema");
const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017/personal-budgetdb';
let rawdata
app.use(cors());

app.get('/budget', (req, res) => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Connected to the database")
        chartModel.find({})
            .then((data) => {
                console.log(data);
                res.json(data);
                mongoose.connection.close()
            })
            .catch((connectionError) => {
                console.log(connectionError)
            })
    })
    .catch((connectionError) => {
        console.log(connectionError)
    })
});

app.post('/budget', (req, res) => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log(req.query)
        chartModel.insertMany(req.query)
            .then(() => {
                res.send('Entry Added!')
                mongoose.connection.close()
            })
            .catch((connectionError) => {
                console.log(connectionError)
            })
    })
    .catch((connectionError) => {
        console.log(connectionError)
    })
});

app.listen(port, () => {
    console.log('API served at http://localhost:'+ port);
});