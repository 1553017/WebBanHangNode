var Product = require("../models/product");
var Cart = require("../models/cart");

module.exports.index = function (req, res, next) {
  var session = req.session;
  Product.find(function (err, product) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 2; // x
    var startIndex = (page - 1) * perPage;
    var endIndex = page * perPage;
    var totalPage = Math.ceil(product.length / perPage);

    var results = {};

    if (endIndex < product.length) {
      results.next = page + 1;
    }

    if (startIndex > 0) {
      results.previous = page - 1;
    }
    console.log(results);
    results.products = product.slice(startIndex, endIndex);
    res.paginatedResults = results;
    res.render("site/page/index", {
      title: "Express",
      products: results.products,
      previousPage: results.previous,
      currentPage: page,
      nextPage: results.next,
      totalPage: totalPage,
      session: session,
    });
  });
};

module.exports.findAll = function (req, res) {
  Product.find(function (err, products) {
    if (err) {
      res.send(err);
    } else {
      res.json(products);
    }
  });
};

module.exports.insertOneApi = function (req, res) {
  var product = new Product(req.body);
  if (product !== null) {
    product.save().then((product) => {
      res.json(product);
    });
  }
  console.log(product);
};

module.exports.tableProductData = function (req, res) {
  Product.find(function (err, products) {
    if (err) {
      res.send(err);
    } else {
      res.render("admin/table", { products: products });
    }
  });
};

module.exports.productSearch = function (req, res) {
  var productTitle = req.query.name;
  var session = req.session;

  Product.find({ $text: { $search: productTitle } }, function (err, product) {
    if (err) {
      res.send(err);
    } else {
      var page = parseInt(req.query.page) || 1;
      var perPage = 2; // x
      var startIndex = (page - 1) * perPage;
      var endIndex = page * perPage;
      var totalPage = Math.ceil(product.length / perPage);
      var results = {};

      if (endIndex < product.length) {
        results.next = page + 1;
      }

      if (startIndex > 0) {
        results.previous = page - 1;
      }
      results.products = product.slice(startIndex, endIndex);
      res.paginatedResults = results;
      res.render("site/page/products", {
        products: results.products,
        previousPage: results.previous,
        currentPage: page,
        nextPage: results.next,
        totalPage: totalPage,
        session: session,
      });
    }
  });
};
