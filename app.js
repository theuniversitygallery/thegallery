require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const corsOptions = require('./server/config/corsOptions')
const path = require("path"); 
const {logEvent, logger} = require('./server/middleware/logEvents');
const errorHandler = require('./server/middleware/errorHandler');
const route = require('./server/routes/root');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const connectDB = require('./server/config/dbConn');
const credentials = require('./server/middleware/credentials');
const PORT = process.env.PORT || 4500;

// connecting to db
connectDB();

// middlewares
app.use(express.urlencoded({extended:false}));
app.use('/',express.static(path.join(__dirname,"/client"))); //static files
app.use('/company',express.static(path.join(__dirname,"/public"))); //static files


// using middleware to process post info
app.use(express.json());

app.use(credentials); 
app.use(cors(corsOptions)); // cross origin resource sharing
// request logger
app.use(logger);

app.use(cookieParser());
// app.use(session(sessionSetting));
app.use(route);

// serving page 404
app.all('*',(req,res)=>{
    res.status(404);
    if(req.accepts('json')){
        res.json({error:"404 not found"})
    }
});
app.use(errorHandler);
mongoose.connection.once('open',()=>{
    console.log('connected to databasse');
    app.listen(PORT, ()=>{
        console.log(`server running on PORT `+ PORT);
    })

})