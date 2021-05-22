//This page is responsible for routing the server

var express = require ("express")
var router = express.Router()
var databaseInfo = require('../models/database')

//The page is expecting post request since the user will give the page some information
router.post('/register', (request, response) => 
{
    var userInfo = new databaseInfo({
        //this is where this method will grab a user's information and make sure it does before the user can submit
        name:request.body.name,
        userName:request.body.userName,
        password:request.body.password
    })
    userInfo.save()
    .then(info =>{
        response.json(info)
    })
    .catch(error =>{
        response.json(error)
    })
})

module.exports = router