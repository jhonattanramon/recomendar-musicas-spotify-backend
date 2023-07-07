const router = require("express").Router();
const spotifyController = require("./controll")

router
  .route("/pesquisa")
  .get((req, res) => spotifyController.pesquisa(req, res));
router
  .route("/pesquisagenere")
  .get((req, res) => spotifyController.pesquisaGenere(req, res));
router
  .route("/pesquisatrack")
  .get((req, res) => spotifyController.pesquisaTrack(req, res));

  module.exports = router