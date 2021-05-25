var mongoose = require("mongoose")
var articleTest = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    sePracticeFull:{
        type:String,
        required:true
    },
    sePracticeShort:{
        type:String,
        required:true
    },
    claim:{
        type:String,
        required:true
    },
    evidenceStrength:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('test_articles', articleTest)