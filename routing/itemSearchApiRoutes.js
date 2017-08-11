  //Dependency, requiring models.
  var db = require ("../models");

  // Get item by name
  app.get("/api/goods", function(req,res){

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


  // Get item by price


  // Get item by category
  app.get("/api/goods", function(req,res){

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
  app.get("/api/goods", function(req,res){

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
};
