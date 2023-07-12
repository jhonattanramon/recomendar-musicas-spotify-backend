const router = require("express").Router();
const {spotifyController} = require("./controll")
router
  .route("/playlist")
  .get((req, res) => spotifyController.playlist(req, res));

router
  .route("/destaque")
  .get((req, res) => spotifyController.playlistsEmDestaque(req, res));

router
  .route("/tracksplaylist")
  .get((req, res) => spotifyController.tracksPlaylist(req, res));

router
  .route("/createplaylist")
  .post((req, res) => spotifyController.createPlaylist(req, res));

router
  .route("/adicionarmusicas")
  .post((req, res) => spotifyController.adionarMusicasPlaylist(req, res));

router
  .route("/playlistuser")
  .get((req, res) => spotifyController.playlistUser(req, res));


  module.exports = router