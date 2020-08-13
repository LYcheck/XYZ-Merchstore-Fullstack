var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1/XYZstore').then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

const cors = require('cors');

var Product = require('./model/product');
var Wishlist = require('./model/wishlist');

var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/product', function(req, res){
    var product = new Product({title:req.body.title, price:req.body.price});
    product.save(function(err, savedProd){
        if(err){
            res.status(500).send({error:"Could not save product"});
        }
        else{
            res.status(200).send(savedProd);
        }
    });
});

app.get('/product', function(req, res){
    Product.find({}, function(err, products){
        if(err){
            res.status(500).sent({error:"Could not fetch product(s)"});
        }
        else{
            res.send(products);
        }
    });
});

app.get('/wishlist', function(req, res){
    Wishlist.find({}).populate({path:'products', model:'Product'}).exec(function(err, wishLists){
        if(err){
            res.status(500).send({error:"Wishlists could not be fetched"});
        }
        else{
            res.status(200).send(wishLists);
        }
    });

});

app.post('/wishlist', function(req, res){
    var wishList = new Wishlist();
    wishList.title = req.body.title;
    
    wishList.save(function(err, newWishList){
        if(err){
            res.status(500).send({error:"Wishlist could not be created"});
        }
        else{
            res.send(newWishList);
        }
    });
});

app.put('/wishlist/product/add', function(req, res){
    Product.findOne({_id: req.body.productId}, function(err, product){
        if(err){
            res.status(500).send({error:"Item not added to wishlist"});
        }
        else{
            Wishlist.update({_id:req.body.wishListId}, {$addToSet:{products: product._id}}, function(err, wishList){
                if(err){
                    res.status(500).send({error:"Item not added to wishlist"});
                }
                else{
                    res.send("Wishlist succesfully updated");
                }
            });
        }
    });
});

app.listen(3004, function() {
    console.log("XYZ Merch Store connected, port 3004");
});