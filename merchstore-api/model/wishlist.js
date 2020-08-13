var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

//Schema constructor for object type "wishList" (Collection of products tailored to user)
var wishList = new Schema({
    title: {type: String, default: "Wishlist"},
    products:[{type: ObjectId, ref:'Product'}]
});

module.exports = mongoose.model('Wishlist', wishList); //Exports model