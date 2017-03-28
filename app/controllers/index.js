const Message = require('../models/message');
exports.index = function(req,res){
  let messagesStr;
  Message
    .find({})
    .populate('from', 'name')
    .exec(function (err, messages) {
      if (err) {
        console.log(err)
      }
      messagesStr=JSON.stringify(messages);
      console.log(messagesStr);
      res.render('index',{
        messagesStr
      });
    });

};
