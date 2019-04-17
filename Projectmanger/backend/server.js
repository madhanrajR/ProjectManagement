var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var userRoutes = require('./routes/users');
var projectRoutes = require('./routes/projects');
var trackRoutes = require('./routes/tracks');
var config = require('./config/db');

var app = express();


mongoose.Promise = global.Promise;
mongoose.connect(config.db,{useNewUrlParser:true}).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
  );


  var lasttime;
    var epoch1 = new Date().getTime();
    var epoch = parseInt(epoch1/1000);
    var starttime = "00:00:00";
    var endtime = "23:59:59";
    var cdate = new Date(epoch1).toLocaleDateString();
    var a = cdate+" "+endtime;
    var b = cdate+" "+starttime;
    var concatendtime = new Date(a);
    var concatstarttime = new Date(b);
    var newendtime = concatendtime.getTime()/1000;
    var newstarttime = concatstarttime.getTime()/1000;
  lasttime=newendtime;
  console.log(epoch,"epoch")
  console.log(endtime,"End time")
  console.log(cdate,"to localdate")
  console.log(a,"a")
  console.log(concatendtime,"econcat")
  console.log(concatstarttime,"sconcat")
  console.log(newendtime,"new epoch")
  console.log(newstarttime,"new startepoch")


//   setInterval(() => {
//     var eepoch1 = new Date().getTime();
//         var eepoch = parseInt(epoch1/1000);
//           console.log('outside',lasttime,eepoch)
//       if(lasttime<eepoch)
//       {
//           console.log('inside')
          
//           var endtime = "18:20:00";
//         var cdate = new Date(eepoch1).toLocaleDateString();
//         var a = cdate+" "+endtime;
//         var concatdatetime = new Date(a);
//         var newendtime = concatdatetime.getTime()/1000;
//         lasttime=newendtime;
//       }
//       console.log(lasttime)
//   }, 1000);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/user',userRoutes);
app.use('/api/project',projectRoutes);
app.use('/api/trackprojects',trackRoutes);

app.get('/',(req,res)=>{
    res.status(200).json({
        message:'Hello World!!!'
    })
})

app.listen(3000,()=>{console.log("server connected!")
})