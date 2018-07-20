var mongoose = require('mongoose');

var productModel = mongoose.Schema({
    name :{type : String},
    price :{type : Number},
    status:{type: Boolean}
});

module.exports = mongoose.model('products',productModel);