if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()

}


const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

/**
 * import the routes from our routes controller
 */

 const indexRouter = require('./routes/index');


/** 
 * set our view engine
 * set where the views will be coming from 
 * __dirname means take the current directory name 
 * hook up express layouts and put it in a layouts folder
 * this is to prevent replicating all the beginning html of our project
 * also tell express where your static files will be 
 * finally tell your app you want to listen in a certain port
*/
app.set('view engine','ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

/** 
 * setting up DB and connecting to MongoDB locally 
 * Remember to set up the database environment
*/
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser : true})


/** Log if we are now connected to the db or not */
const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose!'));


app.use('/', indexRouter);



app.listen(process.env.PORT || 8000);


/** 
 * Note: you dont want to ever hardcode your ports or routes to the DB
 * use process.env.PORT or process.env.DATABASE_URL
 */