const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = app => {
  app.get("/auth/goodreads", passport.authenticate("goodreads"));

  app.get(
    "/auth/goodreads/callback",

    passport.authenticate("goodreads"),

    (req, res) => {
      var envir = process.env.NODE_ENV || "dev";

      var redir = "";

      if (envir != "dev") {
        redir = "/";
      } else {
        redir = "http://localhost:3000";
      }

      res.redirect(redir); //zzz must fix later
    }
  );

  app.get("/auth/logout", (req, res) => {
    var envir = process.env.NODE_ENV || "dev";
    var redir = "";
    if (envir != "dev") {
      redir = "/";
    } else {
      redir = "http://localhost:3000";
    }

    req.logout();
    res.redirect(redir);
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.post("/api/savenotetime", async (req, res) => {
    let userid = req.body.user._id;
    let addsecs = req.body.secscount;
    User.findOneAndUpdate(
      { _id: userid },
      { $inc: { savednotetime: addsecs } },
      { new: true },
      function(err, user) {
        res.send({ totalsecs: user });
      }
    );
  });

  app.post("/api/getnotetimesecs", async (req, res) => {
    let userid = req.body.user._id;
    User.findOneAndUpdate({ _id: userid }, { new: true }, function(err, user) {
      res.send({ totalsecs: user });
    });
  });
};
