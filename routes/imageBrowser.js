var express = require('express');
var router = express.Router();
var api = require('../api/api');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var imageName = req.baseUrl.substr(req.baseUrl.lastIndexOf('/')+1);

  return api.getImage(imageName).then(function(result){
    if(result){
      res.render('imageBrowser', {data : result.value});
    }
    else{
      res.send("error while fetching the image from mongoDB");
    }
  })
});

module.exports = router;
