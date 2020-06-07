var express = require("express");
var router = express.Router();
var Cart = require("../models/cart");
var Product = require("../models/product");

router.get("/", function (req, res) {
  var session = req.session;
  if (!session.cart) {
    res.render("site/page/cart", { title: "Giỏ hàng", products: [],session: session });
  }
  var cart = new Cart(session.cart);
  res.render("site/page/cart", { title: "Giỏ hàng", products: cart.toArray(), session: session });
});

module.exports = router;
