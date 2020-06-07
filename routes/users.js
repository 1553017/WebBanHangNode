var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

//model
var User = require("../models/user");
/* GET users listing. */
// login page
router.get("/login", function (req, res, next) {
  res.render("site/page/login");
});
// register page
router.get("/register", function (req, res, next) {
  res.render("site/page/register");
});

router.post("/register", function (req, res) {
  console.log(req.body);
  const { email, password, password2 } = req.body;
  console.log(password);
  console.log(password2);
  let errors = [];

  if (password !== password2) {
    errors.push({ msg: "Mật khẩu không trùng khớp" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Mật khẩu phải có ít nhất 6 ký tự" });
  }
  console.log(errors);
  if (errors.length > 0) {
    res.render("register", {
      errors,
      email,
      password,
      password2,
    });
  } else {
    //Validate passed
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //User exists
        errors.push({ msg: "Email đã tồn tại" });
        res.render("register", {
          errors,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          email,
          password,
          password2,
        });

        //Hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            //set password to hashed
            newUser.password = hash;
            //save user
            newUser
              .save()
              .then((user) => {
                req.flash("success_msg", "Bạn đã đăng ký thành công");
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Bạn đã đăng xuất");
  req.session.destroy();
  res.redirect("/users/login");
});

module.exports = router;
