(function(){

    var api = {};
    var mongoose = require('mongoose');
    var uuid = require("uuid");
    var imageMapperSchema = require('../config/schema').mapper;

    mongoose.Promise = require('bluebird');

    api.getImage = function(key){
        var Model = mongoose.model('test', imageMapperSchema);
        var promise;

        promise = Model.findOne({'key':key}).exec();

        return promise.then(function(record, err){
            if(record)
                return record;

            if(err)
                res.json("Error while fetching imagemapper from db");

            return false;
        })
    };

    api.postImage = function(imagePath) {
        var Model = mongoose.model('test', imageMapperSchema);
        var promise;

        var key = uuid.v4();
        key = key.substr(key.lastIndexOf('-')+1);

        var image = new Model({
            key : key,
            value : imagePath
        });
        promise = image.save();

        return promise.then(function(result, err){
            if(err){
                console.log("Error while saving the file path to mongodb");
            }
            else {
                return result.key;
            }
            return false;
        })

    };

    module.exports = api;

})();