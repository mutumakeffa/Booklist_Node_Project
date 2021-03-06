if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()

}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

/**
 * import the routes from our routes controller
 */

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

/**
 * install and use body-parser to make it easy to read from a server
 * then remember to tell express how to use that library using app.use()
 */

const bodyParser = require('body-parser');

/** 
 * set our view engine
 * set where the views will be coming from 
 * __dirname means take the current directory name 
 * hook up express layouts and put it in a layouts folder
 * this is to prevent replicating all the beginning html of our project
 * also tell express where your static files will be 
 * finally tell your app you want to listen in a certain port
*/
app.set('views', __dirname + '/views')
app.set('view engine','ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

/** 
 * setting up DB and connecting to MongoDB locally 
 * Remember sto set up the database environment
 * Declare the PORT variable 
*/
const mongoose = require('mongoose')

const PORT = process.env.PORT

mongoose.connect(process.env.DATABASE_URL, {
     useNewUrlParser: true , 
     useUnifiedTopology: true}
)


/** Log if we are now connected to the db or not */
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose!'))


app.use('/', indexRouter)

app.use('/authors', authorRouter)



app.listen(PORT || 3000);


/** 
 * Note: you dont want to ever hardcode your ports or routes to the DB
 * use process.env.PORT or process.env.DATABASE_URL
 */