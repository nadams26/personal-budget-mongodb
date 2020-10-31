const mongoose = require('mongoose');

const hexChecker = (v) => (/^#([0-9a-f]{6})$/i).test(v)

const chartSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
    value:{
        type: Number,
        required: true,
    },
    color:{
        type: String,
        required: true,
        validate: hexChecker,
    }
}, {collection: 'chart'})

module.exports = mongoose.model('chart', chartSchema)