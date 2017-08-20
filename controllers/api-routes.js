// Requiring our models and passport as we've configured it
console.log("we connected the api routes");
var db = require("../models");
var passport = require("../config/passport");
var express = require("express");
// var router = express.Router();
var router = require("./html-routes")
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");


// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.redirect("/");
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", function(req, res) {
    // console.log("Results: " + req.body);
    db.User.create({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        username: req.body.username,
        password: req.body.password,
        UserId: req.body.id
    }).then(function() {
        console.log("redirecting");
        res.redirect(307, "/api/login");
    }).catch(function(err) {
        console.log("Houston we have a problem...");
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


//PUT ROUTE FOR UPDATING USER INFO
router.put("/api/user_data", function(req, res) {
    db.User.update(
        req.body, {
            where: {
                id: req.body.id
            }
        }).then(function(dbUsers) {
        res.json(dbUsers);
    });
});


//CONTROLLER FOR ITEM MANAGEMENT
//POST to create new item
router.post("/api/goods", function(req, res) {

    db.Item.create({
        itemName: req.body.itemName,
        category: req.body.category,
        description: req.body.description,
        owner: req.user.username,
        location: req.user.address,
        price: req.body.pricePerHour,
        itemPhoto: req.body.itemPhoto,
        UserId: req.user.id
    }).then(function(dbItems) {

        res.redirect("/newItem");

    });
});

// DELETE route for deleting Items
router.delete("/api/goods/:id", function(req, res) {
    db.goods.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(dbItems) {
        res.redirect("/itemMmgt");
    });
});

// PUT route for updating items
router.put("/api/goods", function(req, res) {
    db.goods.update(
        req.body, {
            where: {
                id: req.body.id
            }
        }).then(function(dbItems) {
        res.json(dbItems);
    });
});



// GET to populate rented items
//??WHERE ARE WE STORING WHO IS RENTING AN ITEM


// GET to populate owned items
router.get("/api/goods", function(req,res){
      var query = {};
    if (req.query.owner) {
        query.owner = req.query.owner;
    }
    db.Items.findAll({
        where: query,
        include: [db.goods]
    }).then(function(dbItems) {
        res.json(dbItems);
    });
});

router.get("/itemMmgt",isAuthenticated, function(req, res){
    console.log("\n");
    console.log(req.user.id);
    console.log("\n");

    db.Item.findAll({
        where: {
            UserId: req.user.id
        }
    }).then(function(data) {
        var hbsObject = {
            items: data
        };
         res.render("itemMmgt", hbsObject);
    });
});


router.get("/rentedItems",isAuthenticated, function(req, res){
    db.Item.findAll({
        where:{
            rentee: req.user.id
        }
    }).then(function(data) {
    var hbsObject = {
      rentedItems: data
    };
    res.render("rentedItems", hbsObject);
  });
});

router.get("/newItem", isAuthenticated, function(req, res) {
    db.Item.findOne({
        where: {
            id: req.body.id
        }
    }).then(function(data) {

    var hbsObject = {
      user: data
    };
    res.render("createItem", hbsObject);
  });

});

router.get("/", isAuthenticated, function(req, res) {
    db.Item.findAll({}).then(function(data) {
        console.log(data);
    });
});


//########################################


//items search api routing

router.get("/api/goods", function(req, res) {

    var query = {};
    if (req.query.item_Name) {
        query.itemName = req.query.item_Name;
    }
    db.Item.findAll({
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

// Get item by availability
router.get("/api/availability", function(req, res) {
    // var query = {};
    // if (req.query.availability) {
    //   query.availability = req.query.availability;
    // }
    db.Item.findAll({
        where: {
            availability: true
        }
    }).then(function(dbItem) {
        res.json(dbItem);
    });
});

module.exports = router;
