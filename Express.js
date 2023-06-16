const express = require('express')
const port = 8000
const bodyParser = require('body-parser')
const db = require('./configs/mongoose')
const sass = require('sass')
const path = require('path')
const { ObjectId } = require("mongodb"); // Add this line to import ObjectId

const passport=  require('passport')
const localStrategey = require('./configs/passport')
const session = require('express-session')   // session cookie
const MongoStore = require('connect-mongo')   // to remember the session
// defining the server 
const app = express()


app.set('view engine','ejs')
app.set('views','./views')


app.use(express.static('assets'))
app.use(bodyParser.urlencoded({extended:true}))   // form parser -> data available in req.body

app.use(session({
    name:'USER',
    secret:'Floki',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:(1000*60*100)},
    store:MongoStore.create({
        mongoUrl:"mongodb+srv://Lakhsminarasimha:aRI3b0MwtoSQadBW@cluster0.d8c18dg.mongodb.net/TODO?retryWrites=true&w=majority",
        autoRemove:'disabled'
    })
    
}))

app.use(passport.initialize())  // initializing the passport
app.use(passport.session())  // Telling passport to use session

app.use(passport.setAuthenticatedUser)

// Route Header - initial entry to the other routes
app.use('/',require('./routes/index.js'))

app.get('/assets/js/drag.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(path.join(__dirname+'/assets/js/drag.js'));
  });

//Making sever listening to the ports
app.listen(port,function(err){
    if(err){
        return console.log(err)
    }
    return console.log("Server is successfully running on port:",port)
})