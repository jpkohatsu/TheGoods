var exphbs = require("express-handlebars");
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

var port = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Requiring our models
var db = require("./models");
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



// Routes
// ================================================================


//require("./views/login.handlebars")(app);
console.log("logged in");

// Import routes and give the server access to them.

var htmlRoutes = require("./controllers/html-routes.js");
var apiRoutes = require("./controllers/api-routes.js");
// var routes = require("./public/css/goods_style.css");
app.use("/", htmlRoutes);
console.log("we connected our html routes");
app.use("/api", apiRoutes);




// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  })
  .then(function() {
    app.listen(port, function() {
      console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", port, port);
    });
  })
  .catch(function(error) {
      console.log(error);
  });
