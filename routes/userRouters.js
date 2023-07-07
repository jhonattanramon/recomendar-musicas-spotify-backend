const router = require("express").Router();
const spotifyController = require("./controll")

router.route("/token").get((req, res) => spotifyController.token(req, res));
router
  .route("/setdatauser")
  .get((req, res) => spotifyController.data(req, res));
  router.route("/auth").get((req, res) => spotifyController.auth(req, res));
  router
  .route("/authConfirmado")
  .get((req, res) => spotifyController.authConfirmado(req, res));
  router.route("/inforsuser").get((req, res) => spotifyController.inforsUser(req, res));

  module.exports = router