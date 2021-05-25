var express = require ("express")
var router = express.Router()
const articleModel = require('../models/article_model')

//Route
router.get('/', (req, res) => {
    articleModel.find({})
    .then((data) => {
        console.log('Data:', data)
        res.json(data);

    })
    .catch((error) => {
        console.log('Error:', error)
    })

})

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