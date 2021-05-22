const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const articleSchema = new Schema({
    title: String,
    author: String,
    year: String,
    sePracticeFull: String,
    sePracticeShort: String,
    claim: String,
    evidenceStrength: String


});

//Model 

const articleModel = mongoose.model('article', articleSchema)
module.exports = articleModel;