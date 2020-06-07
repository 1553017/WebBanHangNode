var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var controller = require("../controllers/product_controller");

router.get("/search", controller.productSearch);

module.exports = router;
