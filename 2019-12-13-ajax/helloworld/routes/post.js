var express = require('express');
var router = express.Router();


let person = [
  'q',
  'sdf',
  'dsf',
  'yu',
  'chenli',
  '陈丽'
];

router.post('/', function(req, res, next) {
  let obj = {
    code:0,
    msg:'有介个银了啦!'
  }
  let json = req.body;
  console.log(req);
  if(!person.includes(json.user)){
      obj.code = 1;
      obj.msg = '木有介个银!';
  }
  res.send(JSON.stringify(obj));
});

module.exports = router;
