
(function(){

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var mapper = new Schema({
        key : String,
        value : String
    }, {collection: 'images'});

    module.exports.mapper =  mapper;

})();