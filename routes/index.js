var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var uuid = require("uuid");
var api = require('../api/api');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Image Cropper'});
});

router.post('/', function (req, res, next) {
    var body = req.body, base64Data, extension, imageName, targetPath;
    base64Data = body.croppedImage.replace(/^data:image\/png;base64,/, "");
    extension = body.imageName.substr(body.imageName.lastIndexOf('.'));
    imageName = body.imageName.substr(0, body.imageName.lastIndexOf('.'));
    imageName = imageName + uuid.v4() + extension;
    targetPath = path.join(__dirname, "../public/images/" + imageName);

    fs.open(targetPath, 'a+', function (err, fd) {
        // create empty file
        if(err){
            console.log("Error while creating a file");
            res.send("Error while creating file");
        }
        fs.writeFile(targetPath, base64Data, 'base64', function (err) {
            if(err){
                console.log("Error while writing to the a file");
                res.send("Error while writing to the a file");
            }
            console.log("File uploaded to File System");
            return api.postImage('/images/' + imageName).then(function (result) {
                if (result) {
                    res.json({
                        'filePath': 'localhost:3000/images/' + imageName,
                        'mapper': result
                    });
                }
            });
        });
    });
});


module.exports = router;

