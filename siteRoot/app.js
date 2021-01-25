const express = require("express");
var path = require("path");
let mongoose = require("mongoose");
let appConfig = require('./config/appConfig');
let bodyParser = require("body-parser");
let session = require("express-session");
let ejsLint  = require("ejs-lint");

var expressValidator = require('express-validator');
// app.use(expressValidator());
// connection database 

mongoose.connect(appConfig.databse, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connection to mongoodb");
});

// init app
var app = express();

// view engine setup
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", 'ejs');


// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set gloable errors variable 
app.locals.errors = null;

app.get('/', (req, res) =>{
  res.render('index',{
    title:"Front"
  });

  // res.send("hello");
})

//body-parser middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// expres session  middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

// Express Validator middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
      var namespace = param.split('.')
              , root = namespace.shift()
              , formParam = root;

      while (namespace.length) {
          formParam += '[' + namespace.shift() + ']';
      }
      return {
          param: formParam,
          msg: msg,
          value: value
      };
  }
}));

// Express Messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Set Routes
var pages = require("./routes/pages");
var adminPage = require("./routes/adminPage");

app.use('/', pages);
app.use('/admin/pages', adminPage);


//Start the server
var port = 48000;
app.listen(port, ()=>{
    console.log("server is started on port"+port);
})