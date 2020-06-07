var express = require("express");
var router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
var Product = require("../models/product");
var Cart = require("../models/cart");
var controller = require("../controllers/product_controller");

/* GET home page. */
router.get("/", controller.index);

router.get("/detail/:id", function (req, res) {
  var pid = req.params.id;
  Product.findById(pid, function (err, product) {
    var session = req.session;
    res.render("site/page/detail", {
      session: session,
      title: "Chi tiết",
      product: product,
    });
  });
});

router.get("/add-to-cart/:id", function (req, res, next) {
  var pid = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : { item: {} });
  var session = req.session;
  Product.findById(pid, function (err, product) {
    cart.add(product, pid, product.imagePath);
    req.session.cart = cart;
    console.log(cart);
    res.redirect("/detail/" + pid);
  });
});

router.get("/products/search", controller.productSearch);

module.exports = router;
