var express = require("express");
var router = express.Router();
var path = require("path");
console.log("##############################\n");
console.log("connected to html-routes");
// Requiring path to so we can use relative routes to our HTML files


// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");


router.get("/", isAuthenticated, function(req, res) {

    //Insert Sequelize Query Here
    if (req.user) {
        res.render("index");
    } else {
        res.render("login");
    }
});

router.get("/login", function(req, res) {
    //Insert Sequelize Query Here

    res.render("login");
});

router.get("/checkout", function(req, res) {
    //Insert Sequelize Query Here

    res.render("checkout");
});

router.get("/itemResults", function(req, res) {
    //Insert Sequelize Query Here
    res.render("itemResults");
});

router.get("/checkout", function(req, res) {
    //Insert Sequelize Query Here
    res.render("checkout");
});


// Route for logging user out
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

router.get("/newUser", function(req, res) {
    res.render("newUser");
});



router.get("newItem", function(req, res) {
    res.render("newItem");
});

// router.get("/itemMmgt", function(req, res) {
//     //Insert Sequelize Query Here

//     res.render("itemMmgt");
// });
//
//
//   app.get("/login", function(req, res) {
//     // If the user already has an account send them to the members page
//     if (req.user) {
//       res.redirect("/members");
//     }
//     res.sendFile(path.join(__dirname, "../public/login.html"));
//   });
//
//   // Here we've add our isAuthenticated middleware to this route.
//   // If a user who is not logged in tries to access this route they will be redirected to the signup page
//   app.get("/members", isAuthenticated, function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/members.html"));
//   });
//


module.exports = router;
