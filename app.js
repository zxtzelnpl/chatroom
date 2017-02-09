const port=process.env.PORT || 3000;

const path=require('path');

const express = require('express') ;
const app = express();

app.set('views','./app/views/pages');
app.set('view engine','pug');

require('./config/routes')(app);

app.listen(port,function(){
  console.log('Express server listening on port ' + port);
});

app.use(express.static(path.join(__dirname,'public')));
