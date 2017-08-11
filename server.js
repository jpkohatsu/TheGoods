var exphbs = require("express-handlebars");
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var port = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our models
var db = require("./models");

// Routes
// ================================================================


//require("./views/login.handlebars")(app);
// console.log("logged in");
// Import routes and give the server access to them.
//var routes = require("./controllers/catsController.js");
var routes = require("./controllers/goods_controller.js");
app.use("/", routes);

// Syncing our database and logging a message to the user upon success
// db.sequelize.sync().then(function() {
//   app.listen(PORT, function() {
//     console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
//   });
// });

app.listen(port, function() {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", port, port);
});
