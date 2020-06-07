var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect( "mongodb://localhost:27017/food");
var Products = [
    new Product({
        title: "Bông cải trắng",
        imagePath : "../images/bong-cai-trang.jpg",
        productType : 0,
        price : 50000,
        descript : "Bông cải trắng Đà Lạt"
    }),
    new Product({
        title: "Đậu hà lan xanh",
        imagePath : "../images/dau-ha-lan-xanh.jpg",
        productType : 1,
        price : 100000,
        descript : "Đậu hà lan xanh"
    }),
    new Product({
        title: "Đậu cúc",
        imagePath : "../images/dau-cuc.jpg",
        productType : 2,
        price : 50000,
        descript : "Đậu cúc"
    }),
    new Product({
        title: "Nghệ tươi",
        imagePath : "../images/nghe-tuoi.jpg",
        productType : 3,
        price : 25000,
        descript : "Nghê tươi"
    }),
    new Product({
        title: "Xà lách xoăn",
        imagePath : "../images/xa-lach-xoan.jpg",
        productType : 4,
        price : 20000,
        descript : "Xà lách xoăn"
    })
];

var done = 0;
for(var i=0; i<Products.length;i++)
{
    Products[i].save(function(err,result){
        done++;
        if(done  === Products.length){
            exit();
        }
    })
};

function exit(){
    mongoose.disconnect();
}