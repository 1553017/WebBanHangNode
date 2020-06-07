var express = require("express");
var paypal = require("paypal-rest-sdk");
var router = express.Router();

router.get("/", function (req, res) {
  var session = req.session;
  res.render("site/page/payment", {
    title: "Giỏ hàng",
    products: [],
    session: session,
  });
});

router.get("/success", function (req, res) {
  // var session = req.session;
  // const payerId = req.query.PayerID;
  // const paymentId = req.query.paymentId;
  // const execute_payment_json = {
  //     "payer_id": "Appended to redirect url",
  //     "transaction":
  // }
  var paymentId = req.session.paymentId;
  var payerId = req.param("PayerID");

  var details = { payer_id: payerId };
  paypal.payment.execute(paymentId, details, function (error, payment) {
    if (error) {
      console.log(error);
    } else {
      res.send("success");
    }
  });
});

router.post("/", function (req, res) {
  var create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/payment/success",
      cancel_url: "/fail",
    },
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "1.00",
        },
        description: "This is the payment description.",
      },
    ],
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log("Create Payment Response");
      console.log(payment);
      var redirectUrl;
      if (payment.payer.payment_method === "paypal") {
        req.session.paymentId = payment.id;
        for (let i = 0; i < payment.links.length; i++) {
          var link = payment.links[i];
          if (link.method === "REDIRECT") {
            redirectUrl = link.href;
          }
        }
        res.redirect(redirectUrl);
      }
    }
  });
});

module.exports = router;
