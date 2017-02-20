var Message=require('../models/message');
var User=require('../models/user');

exports.getmessage = function(req,res){
  Message
    .find({})
    .populate('from','name')
    .exec(function(err,messages){
      if(err){
        console.log(err)
      }
      res.json(messages);
    })
};

exports.sendmessage=function(req,res){
  var _message=req.query;

  console.log(_message);

  _message.from=req.session.user._id;

  var message=new Message(_message);
  message.save(function(err,message){
    if(err){
      console.log(err)
    }
    res.json({
      state:'success'
    })
  })
};

exports.save=function(msg,user,next){
  var _message={};
  _message.from=user._id;
  _message.content=msg;

  var message=new Message(_message);
  message.save(function(err,message){
    if(err){
      console.log(err);
    }
    next(message);
  })
};
