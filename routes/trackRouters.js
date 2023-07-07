const router = require("express").Router();
const spotifyController = require("./controll")

router.route("/track").get((req, res) => spotifyController.track(req, res));

module.exports = router