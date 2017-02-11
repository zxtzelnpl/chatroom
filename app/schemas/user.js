var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
  name:{

  }
  ,password:String
  ,meta:{
    createAt:{
      type:Date
      ,default:Date.now()
    }
    ,updateAt:{
      type:Date
      ,default:Date.now()
    }
  }
});

UserSchema.pre('save',function(next){
  const user = this;
  if(user.isNew){
    user.meta.createAt = this.meta.updateAt = Date.now()
  }else{
    this.meta.updateAt = Date.now()
  }

  bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
    if(err){
      return next(err)
    }

    bcrypt.hash(user.password,salt,function(err,hash){
      if(err){
        return next(err)
      }
      user.password = hash;
      next()
    })
  });
});

UserSchema.methods = {
  comparePassword:function(_password,cb){
    bcrypt.compare(_password,this.password,function(err,isMatch){
      if(err){
        return cb(err)
      }
      cb(null,isMatch)
    })
  }
};

UserSchema.statics={
  fetch:function(cb){
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findById:function(id,cb){
    return this
      .findOne({_id:id})
      .exec(cb);
  }
};

module.exports = UserSchema;
