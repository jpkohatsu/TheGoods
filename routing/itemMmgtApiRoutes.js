//itemMmgtApiRoute.js - this file offers a set of routes for creating new items, modifying and deleting items

//Dependency, requiring models.
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // Items route for saving a new Items
  app.post("/api/goods", function(req, res) {
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
  app.delete("/api/goods/:id", function(req, res) {
    db.Items.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbItems) {
      res.json(dbItems);
    });
  });

  // PUT route for updating items
  app.put("/api/goods", function(req, res) {
    db.Items.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbItems) {
        res.json(dbItems);
      });
  });
};





