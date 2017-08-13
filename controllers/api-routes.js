// Requiring our models and passport as we've configured it
console.log("we connected the api routes");
var db = require("../models");
var passport = require("../config/passport");
var express = require("express");
var router = express.Router();
var path = require("path");


// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/index");
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        username: req.body.username,
        password: req.body.password
    }).then(function() {
        res.redirect(307, "/api/login");
    }).catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
    });
});

  

// Route for getting some data about our user to be used client side
router.get("/api/user_data", function(req, res) {
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
    } else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.users.email,
            id: req.users.id
        });
    }
});


//controller for item management
router.post("/api/goods", function(req, res) {
    db.Items.create({
        itemName: req.body.itemName,
        category: req.body.category,
        pricePerHour: req.body.pricePerHour,
        itemPhoto: req.body.itemPhoto
    }).then(function(dbItems) {
        res.json(dbItems);
    });
});

// DELETE route for deleting Items
router.delete("/api/goods/:id", function(req, res) {
    db.Items.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(dbItems) {
        res.json(dbItems);
    });
});

// PUT route for updating items
router.put("/api/goods", function(req, res) {
    db.Items.update(
        req.body, {
            where: {
                id: req.body.id
            }
        }).then(function(dbItems) {
        res.json(dbItems);
    });
});

//########################################


//items search api routing

router.get("/api/goods", function(req, res) {

    var query = {};
    if (req.query.item_Name) {
        query.itemName = req.query.item_Name;
    }
    db.Items.findAll({
        where: query,
        include: [db.goods]
    }).then(function(dbItems) {
        res.json(dbItems);
    });
});

// Get item by location
router.get("/api/goods", function(req, res) {

    var query = {};
    if (req.query.itemLoc) {
        query.location = req.query.itemLoc;
    }
    db.Items.findAll({
        where: query,
        include: [db.goods]
    }).then(function(dbItems) {
        res.json(dbItems);
    });
});

// Get item by price
router.get("/api/goods", function(req, res) {

    var query = {};
    if (req.query.item_price) {
        query.pricePerHour = req.query.item_price;
    }
    db.Items.findAll({
        where: query,
        include: [db.goods]
    }).then(function(dbItems) {
        res.json(dbItems);
    });
});

// Get item by category
router.get("/api/goods", function(req, res) {

    var query = {};
    if (req.query.goryCat) {
        query.category = req.query.goryCat;
    }
    db.Items.findAll({
        where: query,
        include: [db.goods]
    }).then(function(dbItems) {
        res.json(dbItems);
    });
});

// Get item by user
router.get("/api/goods", function(req, res) {

    var query = {};
    if (req.query.Owner) {
        query.owner = req.query.Owner;
    }
    db.Items.findAll({
        where: query,
        include: [db.user]
    }).then(function(dbItems) {
        res.json(dbItems);
    });
});
module.exports = router;

