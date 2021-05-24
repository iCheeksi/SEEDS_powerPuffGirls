//This page is responsible for routing the server

var express = require ("express")
var router = express.Router()
const articleModel = require('../models/article_model')

//The page is expecting post request since the user will give the page some information
router.post('/submit', (request, response) => 
{
    var articleInfo = new articleModel({
        //this is where this method will grab an article information and make sure it does before the user can submit
        key:request.body.key,
        title:request.body.title,
        author:request.body.author,
        year:request.body.year,
        sePracticeFull:request.body.sePracticeFull,
        sePracticeShort:request.body.sePracticeShort,
        claim:request.body.claim,
        evidenceStrength:request.body.evidenceStrength

    })
    articleInfo.save()
    .then(info =>{
        response.json(info)
    })
    .catch(error =>{
        response.json(error)
    })
})

module.exports = router