var express = require("express");
var router = express.Router();
var controller = require("../controllers/product_controller");

// router.get("/", controller.findAll);
router.get("/", function (req, res, next) {
  res.render("admin/indexAdmin");
});

router.get("/tables", controller.tableProductData);

router.post("/api/add", controller.insertOneApi);

module.exports = router;
