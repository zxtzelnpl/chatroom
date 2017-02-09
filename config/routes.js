/**
 * Created by zxt_z on 2017/2/9.
 */
const Index = require('../app/controllers/index');

module.exports = function(app){


  //Index
  app.get('/',Index.index);
};
