var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const paypal = require("paypal-rest-sdk");
const fs = require("fs");
const MongoStore = require('connect-mongo')(session);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cartsRouter = require("./routes/cart");
var paymentRouter = require("./routes/payment");
var adminRouter = require("./routes/admin");
var productRouter = require("./routes/admin");

var app = express();

try {
  var configJSON = fs.readFileSync(__dirname + "/config.json");
  var config = JSON.parse(configJSON.toString());
} catch (e) {
  console.error("File config.json not found or is invalid: " + e.message);
  process.exit(1);
}
//paypal
paypal.configure(config.api);

//Passport config
require("./config/passport")(passport);

mongoose.connect(
  "mongodb://localhost:27017/food",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to DB")
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "MySuperSecret",
    resave: true,
    saveUnitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    // cookie: { path: '/', httpOnly: true, maxAge: 30* 30000},
    rolling: true,
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/carts", cartsRouter);
app.use("/payment", paymentRouter);
app.use("/admin", adminRouter);
app.use("/products", productRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
