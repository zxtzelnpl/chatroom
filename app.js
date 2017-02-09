/**
 * Created by Administrator on 2017/2/9 0009.
 */
const port=process.env.PORT || 3000;

import express from 'express';

const app = express();


app.listen(port,()=>{
  console.log('imooc started on port ' + port);
});
