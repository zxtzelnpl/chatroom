var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Message = require('../app/controllers/Message');

module.exports = function(app,io){
  let user=null;
  //pre handle user
  app.use(function(req,res,next){
    var _user = req.session.user;
    user=app.locals.user = _user;

    console.log(user);

    next();
  });

  //Index
  app.get('/',Index.index);

  //User
  app.post('/signup',User.signup);
  app.post('/signin',User.signin);
  app.get('/logout',User.logout);

  //Message
  app.get('/sendmessage',Message.sendmessage);
  app.get('/getmessage',Message.getmessage);

  //Message
  io.on('connection',function(socket){
    console.log('a user is in connection');
    socket.on('chat message', function (msg) {
      Message.save(msg,user,function(message){
        io.emit('chat message',message);
      });

    });
  })

};
