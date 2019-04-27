const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const util = require("util");
const cors = require("cors");

require("./models/User");
require("./models/Book");
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoURI || keys.mongoURI, {
  useNewUrlParser: true
});

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey || keys.cookieKey]
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.set("json spaces", 20); //prettify the json lol. omg so pretttyyy!

require("./routes/authRoutes")(app);
require("./routes/booksRoutes")(app);
//require('./routes/twilioRoutes')(app);

const PORT = process.env.PORT || 9000;

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
