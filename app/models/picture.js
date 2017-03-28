var mongoose = require('mongoose');
var PictureSchema = require('../schemas/picture.js');
var Picture = mongoose.model('Picture',PictureSchema);

module.exports = Picture;
