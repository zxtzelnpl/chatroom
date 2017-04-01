var Message = require('../models/message');
var User = require('../models/user');

exports.getmessage = function (req, res) {
    let page = req.query.page;
    let nums = 30;
    Message
        .find({})
        .sort({_id: -1})
        .skip(page * nums)
        .limit(nums)
        .populate('from', 'name')
        .exec(function (err, messages) {
            console.log(messages);
            if (err) {
                console.log(err)
            }
            res.json(messages);
        })
};

exports.sendmessage = function (req, res) {
    var _message = req.query;


    _message.from = req.session.user._id;

    var message = new Message(_message);
    message.save(function (err, message) {
        if (err) {
            console.log(err)
        }
        res.json({
            state: 'success'
        })
    })
};

exports.save = function (msg, next) {

    User.findOne({name: msg.name}, function (err, user) {
        var _message = {
            from: {}
        };
        if (err) {
            console.log(err)
        }

        _message.from = user._id;
        _message.content = msg.content;

        var message = new Message(_message);
        message.save(function (err, message) {
            if (err) {
                console.log(err);
            }
            var _id = message._id;
            Message
                .findOne({_id: _id})
                .populate('from', 'name')
                .exec(function (err, messages) {
                    if (err) {
                        console.log(err)
                    }
                    next(messages);
                })
        })
    });

    // var _message={
    //   from:{}
    // };
    // _message.from.name=msg.name;
    // _message.content=msg.content;
    //
    // var message=new Message(_message);
    // message.save(function(err,message){
    //   if(err){
    //     console.log(err);
    //   }
    //   next(message);
    // })
};
