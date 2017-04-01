/**定义常量**/
const port = process.env.PORT || 3000;
const dbUrl = 'mongodb://localhost/junyin';
const secret='junyin';

/**引如外部**/
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectMongo=require('connect-mongo');
const http = require('http');
const io=require('socket.io');
const cookie = require('cookie');

/**引如内部路由**/
const routes = require('./config/routes');

/**1.链接数据库start**/
mongoose.connect(dbUrl);
mongoose.connection.on('connected', function () {
    console.log('MongoDateBase connection success!')
});
/**1.链接数据库end**/

/**2.建立app和sio对象start*/
const app = express();
const server = http.Server(app);
const sio = io(server);
/**2.建立app和sio对象end*/

/**3.session持久化start*/
const mongoStore = connectMongo(session);
const sessionStore = new mongoStore({
    mongooseConnection: mongoose.connection
    , collection: 'session'
    , ttl: 14 * 24 * 60*60
});
const sessionMiddleware=session({
    secret: secret
    , resave: true
    , saveUninitialized: true
    , store: sessionStore
    , cookie:{
        maxAge:24*60*60*1000
    }
});
/**3.session持久化end*/

/**4.parseCookie建立并加密start*/
const parseCookie = cookieParser(secret);
/**4.parseCookie建立并加密end*/


/**5.模版文件start*/
app.set('views', './app/views/pages');
app.set('view engine', 'pug');
/**5.模版文件end*/


/**6.中间件start*/
app.use(parseCookie);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
sio.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});
/**6.中间件end*/

/**7.路由文件start*/
routes(app, sio,sessionStore);
/**7.路由文件end*/

/**8.服务器端口监听start*/
server.listen(port, function () {
    console.log('Express server listening on port ' + port);
});
/**8..服务器端口监听start*/
