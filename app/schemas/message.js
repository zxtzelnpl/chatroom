var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;

var MessageSchema = new Schema({
  from:{
    type:ObjectId
    ,ref:'User'
  }
  ,content:String
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

MessageSchema.statics={
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

module.exports = MessageSchema;
