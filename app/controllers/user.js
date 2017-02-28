var User = require('../models/user.js');

//注册
exports.signup = function(req,res){

  var _user = req.body;
  User.findOne({name:_user.name},function(err,user){
    if(err){
      console.log(err)
    }
    if(user){
      return res.json({
        state:'fail'
        ,reason:'name repeat'
      })
    }
    else{
      user = new User(_user);
      user.save(function(err,user){
        if(err){
          console.log(err)
        }

        req.session.user = user;

        res.json({
          state:'success'
          ,name:user.name
          ,password:user.password
        })
      })
    }
  });
};

//登陆
exports.signin = function(req,res){
  var _user = req.body;
  var name = _user.name;
  var password = _user.password;

  User.findOne({name:name},function(err,user){
    if(err){
      console.log(err)
    }

    if(!user){
      return res.json({
        state:'fail'
        ,reason:'no name'
      })
    }

    user.comparePassword(password,function(err,isMatch){
      if(err){
        console.log(err)
      }
      if(isMatch){
        req.session.user = user;
        return res.json({
          state:'success'
          ,name:user.name
          ,password:user.password
        });
      }
      else{
        return res.json({
          state:'fail'
          ,reason:'password wrong'
        })
      }
    })
  })
};

//登出
exports.logout = function(req,res){
  delete req.session.user;
  res.json({
    state:'success'
  })
};
