var User = require('../models/user.js');

//注册
exports.signup = function(req,res){
  var _user = req.body.user;
  User.findOne({name:_user.name},function(err,user){
    if(err){
      console.log(err)
    }
    if(user){
      return res.redirect('/')
    }
    else{
      user = new User(_user);
      user.save(function(err,user){
        if(err){
          console.log(err)
        }
        res.redirect('/')
      })
    }
  });
};

//登陆
exports.signin = function(req,res){
  var _user = req.body.user;
  var name = _user.name;
  var password = _user.password;

  User.findOne({name:name},function(err,user){
    if(err){
      console.log(err)
    }

    if(!user){
      return res.redirect('/signup')
    }

    user.comparePassword(password,function(err,isMatch){
      if(err){
        console.log(err)
      }
      if(isMatch){
        req.session.user = user;
        return res.redirect('/')
      }
      else{
        return res.redirect('/signin')
      }
    })
  })
};

//登出
exports.logout = function(req,res){
  delete req.session.user;
  res.redirect('/')
};
