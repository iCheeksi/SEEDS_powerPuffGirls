var express = require("express")
var app = express()
var cor = require("cors")
var mongoose = require('mongoose')
var dotenv = require("dotenv")
var routeUrls = require('./router/route')
const routes = require('./router/api')
dotenv.config()
const MONGODB = "mongodb+srv://powerpuffgirls:PowerPuffGirls@cluster0.6hhuy.mongodb.net/userTable?retryWrites=true&w=majority";


mongoose.connect(process.env.MONGODB_URI || MONGODB), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connection.on ('connected', () => {
    console.log('Mongoose is connected')
});
app.use(express.json()) //body passer activated
app.use(cor())
app.use('/api', routes)
app.use('/server', routeUrls)

//for heroku deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('register/build')); 
  }

app.listen( process.env.PORT || 3001, () =>{
    console.log("Server is working!")
})