var express = require("express");
var router = express.Router();
router.get("/", function(req, res) {
  //Insert Sequelize Query Here 
    res.render("index");
});
module.exports = router;
