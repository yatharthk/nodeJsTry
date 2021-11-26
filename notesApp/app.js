var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser=require('body-parser');

const session=require('express-session');

const helmet=require('helmet');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// var mongoose=require('mongoose');

var app = express();

app.use(session({
  name:'my-session',
  cookie:{
    maxAge:1000*60,

    // accept http only
  httpOnly:true,

  path:'/',
},
secret:'mypasswordinfy',
resave:false,
saveUninitialized:false,

})
);

app.use(helmet());  
app.use((req,res,next)=>{
  var {visit}= req.session;

  if(!visit){
    visit=req.session.visit={
      count:1,
    };
  }
  else{
    visit.count++;
  }
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join('views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.ejs',{err:err});
});

app.listen(3000,(req,res)=>{
  console.log(`Server started at port 3000`);
})
module.exports = app;
