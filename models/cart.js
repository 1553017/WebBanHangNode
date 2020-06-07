// var mongoose = require("mongoose");
// var Schema = mongoose.Schema;
// mongoose.Promise = global.Promise;

// var cart = new Schema(
//   {
//     name: String,
//     email: String,
//     sdt: String,
//     msg: String,
//     cart: Object,
//     st: Number,
//   },
//   { collection: "Cart" }
// );

// module.exports = mongoose.model("Cart", cart);

module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.count = oldCart.count || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function (item, id, imagePath) {
    var storeItem = this.items[id];
    if (!storeItem) {
      storeItem = this.items[id] = {
        item: item,
        quantity: 0,
        price: 0,
        imagePath: "",
      };
    }

    storeItem.quantity++;
    storeItem.price = storeItem.item.price * storeItem.quantity;
    storeItem.imagePath = imagePath;
    this.count++;
    this.totalPrice += storeItem.item.price;
  };

  this.toArray = function () {
    var a = [];

    for (var id in this.items) {
      a.push(this.items[id]);
    }
    return a;
  };
};
