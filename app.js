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

app.set('views','./app/views/pages');
app.set('view engine','pug');

//链接数据库
mongoose.connect(dbUrl);
mongoose.connection.on('connected', function () {
  console.log('MongoDateBase connection success!')
});

routes(app);
app.listen(port,function(){
  console.log('Express server listening on port ' + port);
});

app.use(session({
  secret:'junyin'
  ,resave:fasle
  ,saveUninitialized:true
  ,store:new mongoStore({
    url:dbUrl
    ,collection:'session'
  })
}));
app.use('cookie-parser');
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(express.static(path.join(__dirname,'public')));
