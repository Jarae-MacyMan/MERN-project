var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var patientsRouter = require('./routes/patients');
var dummyRouter = require('./routes/dummy');

const ExamRoutes= require('./routes/exam')

var app = express();

require('dotenv').config()

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const mongoose=require('mongoose')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/patients', patientsRouter);
app.use('/dummy', dummyRouter);

//connecting to MONGODBB
app.use('/Exam', ExamRoutes)

//connect to db
//its aync so returns a promise
/*  mongoose.connect(process.env.MONG_URI)
    .then(()=>{
        //listen for request
        app.listen(process.env.PORT,()=> {
            console.log('listening on port 9000')
        })
    })
    .catch((error) =>{
        console.log(error)
    }) */
 

 /*    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://GreenGrapes:LMFF72PwVP6q@greengrapesmernapp.vrpmop7.mongodb.net/?retryWrites=true&w=majority";
    
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    
    async function run() {
      try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    run().catch(console.dir); */
    
>>>>>>> 240597be673a1d59bc5948a37bfed0b8c9117fda

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
  res.status(err.status || 500).send('Resource not found');
  // res.render('error');
});

module.exports = app;
