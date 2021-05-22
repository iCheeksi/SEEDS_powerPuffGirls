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
module.exports = router