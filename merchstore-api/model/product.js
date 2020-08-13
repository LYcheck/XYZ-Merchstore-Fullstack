var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema constructor for object type "product" (Contains info on certain item)
var product = new Schema({
    title: String,
    price: Number,
    hearts: {type: Number, default: 0}
});

module.exports = mongoose.model('Product', product);