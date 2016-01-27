var express = require("express");
var http = require('http');
var index = require('./routes/index');
var dash = require('./routes/dash');
var db = require('./models/database');
var mainModel = require('./models/main');
var app = express();
var router = express.Router();
app.use(express.logger());

//mainModel.userLogin('ahmed20'); 

// Configuration
  
  app.configure(function(){
  app.set('views', __dirname + '/app');
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/app'));
  app.use(express.static(__dirname + '/bower_components'));
  
  app.use('/',index);
  app.use('/users',dash);
   

 app.use(db);
 app.use(mainModel);
  
  
  app.use(app.router);
  app.engine('html', require('ejs').renderFile);
  
}); 

// app.get('/', function(request, response) {
//   response.render('index.html')
// }); 
// app.get('/main',function(request,response){
//     response.render('views/main.html')
// })

// app.get('/dash',function(request,response){
//     response.render('views/dash.html');
// })
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

//module.exports = app;