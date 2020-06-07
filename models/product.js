var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var product = new Schema(
  {
    title: { type: String, required: true },
    imagePath: { type: String, required: true },
    productType: { type: Number, required: true },
    price: { type: Number, required: true },
    descript: { type: String },
    origin: { type: String },
    weight: { type: Number, required: true },
  },
  { collection: "Product" }
);
// product.index({name: 'text', 'profile.something': 'text'});
// product.index({'$**': 'text'});

module.exports = mongoose.model("Product", product);
