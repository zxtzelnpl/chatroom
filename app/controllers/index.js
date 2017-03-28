const Message = require('../models/message');
exports.index = function(req,res){
  let messagesStr;
  Message
    .find({})
    .sort({_id:-1})
    .skip(0)
    .limit(30)
    .populate('from', 'name')
    .exec(function (err, messages) {
      if (err) {
        console.log(err)
      }
      messagesStr=JSON.stringify(messages);
      res.render('index',{
        messagesStr
      });
    });
};
