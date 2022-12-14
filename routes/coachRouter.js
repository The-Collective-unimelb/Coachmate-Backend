const express = require("express");
const router = express.Router();
const generalController = require("../controllers/generalController");
const coachController = require("../controllers/coachController");
const passport = require("passport");
const bcrypt = require("bcrypt");

const Coach = require("../models/coach");
const utils = require("../utils");

router.get("/", (req, res) => {
  Coach.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

router.get("/coach-dashboard", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../", "coachmate-frontend", "build", "index.html")
  );
});

router.post("/register", generalController.register);

router.post(
  "/login",
  async (req, res, next) => {
    var coach = await Coach.findOne({ email: req.body.email });
    if (coach) {
      if (await bcrypt.compare(req.body.password, coach.password)) {
        USER = { id: coach.id, role: "coach" };
      }
    }

    console.log(USER);
    return next();
  },
  passport.authenticate("coach-login", {
    successRedirect: "/contact",
    failureRedirect: "/fail",
    session: true,
  })
);

router.get("/getDetails", async (req, res) => {
  var coach = await Coach.findById(USER.id);
  res.send(coach);
});

router.get("/getId", (req, res) => {
  res.send(USER.id);
});
router.post("/logout", (req, res) => {
  console.log(USER.id);
  if (USER) {
    USER = null;
    res.redirect("/");
  }
});

router.get("/:id", function (req, res, next) {
  Coach.findById(req.params.id, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

router.post("/update", coachController.updateProfile);

router.get("/viewBookings", coachController.viewBookings);

router.post("/acceptBookings", coachController.acceptBooking);

router.post("/cancelBookings", coachController.cancelBooking);

module.exports = router;
