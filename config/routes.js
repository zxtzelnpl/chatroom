const Index = require('../app/controllers/index');
const User = require('../app/controllers/user');

module.exports = function(app){


  //Index
  app.get('/',Index.index);

  //User
  app.post('/signup',User.signup);
  app.post('/signin',User.signin);
  app.get('/logout',User.logout);

};
