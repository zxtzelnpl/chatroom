var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;

var PictureSchema = new Schema({
  from:{
    type:ObjectId
    ,ref:'User'
  }
  ,src:String
  ,url:String
  ,alt:{
    type:String
    ,default:'图片'
  }
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

PictureSchema.statics={
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

module.exports = PictureSchema;
