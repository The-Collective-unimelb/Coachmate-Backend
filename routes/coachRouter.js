const express = require("express");
const router = express.Router();
const generalController = require("../controllers/generalController");

const coach = require("../models/coach");

router.get("/", (req, res) => {
  coach
    .find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", dataError);
    });
});

router.post("/register", generalController.register)

module.exports = router;