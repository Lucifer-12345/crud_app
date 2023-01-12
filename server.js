const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app=express();

dotenv.config({path:'config.env'})
const PORT = process.eventNames.PORT || 8080


//log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();
//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

// set view engine
app.set("view engine","ejs")
//app.set("views",path.resolve(__dirname, "views/ejs"))

//load assets
app.use('/css',express.static(path.resolve(__dirname, "assets/css")))
app.use('/img',express.static(path.resolve(__dirname, "assets/img")))
app.use('/js',express.static(path.resolve(__dirname, "assets/js")))
//css/style.css

// load routers
app.use('/',require('./server/routers/router'))
app.listen(3000, ()=> {
    console.log(`server is running on port ${PORT}`)
});


//MONGO_URI=mongodb+srv://admin:admin123@cluster0.prgh46d.mongodb.net/?retryWrites=true&w=majority
//MONGO_URI=mongodb://127.0.0.1:27017/user
