var port=process.env.PORT || 3000;
var dbUrl='mongodb://localhost/junyin';



var path=require('path');

var mongoose = require('mongoose');
var express = require('express') ;
var cookieParser = require('cookie-parser');

var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');

var routes=require('./config/routes');

var app = express();
var http=require('http').Server(app);
var io = require('socket.io')(http);

app.set('views','./app/views/pages');
app.set('view engine','pug');

//链接数据库
mongoose.connect(dbUrl);
mongoose.connection.on('connected', function () {
  console.log('MongoDateBase connection success!')
});

app.use(session({
  secret:'junyin'
  ,resave:true
  ,saveUninitialized:true
  ,store:new mongoStore({
    url:dbUrl
    ,collection:'session'
    ,maxAge:1000*60*10
  })
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(express.static(path.join(__dirname,'public')));

routes(app);

io.on('connection',function(socket){
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('chat message', function (msg) {
    console.log(msg);
    //io.emit('chat message',msg);
  });
});

http.listen(port,function(){
  console.log('Express server listening on port ' + port);
});


