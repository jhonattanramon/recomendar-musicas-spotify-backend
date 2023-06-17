const router = require("express").Router();

const spotifyController = require("../controllers/spotifyApiController");

//autenticação
router.route("/token").get((req, res) => spotifyController.token(req, res));
router.route("/auth").get((req, res) => spotifyController.auth(req, res));
router
  .route("/authConfirmado")
  .get((req, res) => spotifyController.authConfirmado(req, res));
//##

//user
router.route("/user").get((req, res) => spotifyController.user(req, res));
//##

//playlist
router
  .route("/playlist")
  .get((req, res) => spotifyController.playlist(req, res));
router
  .route("/playlistsEmDestaque")
  .get((req, res) => spotifyController.playlistsEmDestaque(req, res));
router
  .route("/tracksplaylist")
  .get((req, res) => spotifyController.tracksPlaylist(req, res));
//##

//pesquisa
router
  .route("/pesquisa")
  .get((req, res) => spotifyController.pesquisa(req, res));
router
  .route("/pesquisagenere")
  .get((req, res) => spotifyController.pesquisaGenere(req, res));
router
  .route("/pesquisatrack")
  .get((req, res) => spotifyController.pesquisaTrack(req, res));
//##

router.route("/track").get((req, res) => spotifyController.track(req, res));
router
  .route("/obtergeneros")
  .get((req, res) => spotifyController.obterGeneros(req, res));

//artistas
router
  .route("/tracksartist")
  .get((req, res) => spotifyController.tracksArtists(req, res));

router
  .route("/obtervariosartistas")
  .get((req, res) => spotifyController.obterVariosArtistas(req, res));


  router
    .route("/criarplaylist")
    .post((req, res) => spotifyController.criarPlaylist(req, res));

    
module.exports = router;
