var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Message = require('../app/controllers/Message');

module.exports = function(app){
  //pre handle user
  app.use(function(req,res,next){
    var _user = req.session.user;
    app.locals.user = _user;

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

};
