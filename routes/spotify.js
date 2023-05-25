const router =  require('express').Router();

const spotifyController = require("../controllers/spotifyApiController")

router.route("/token").get((req, res) => spotifyController.token(req, res));
router.route('/user').get( ( req, res) => spotifyController.user( req, res) )
router.route('/auth').get( ( req, res) => spotifyController.auth( req, res))
router.route('/playlist').get((req,res) => spotifyController.playlist( req, res))
router.route('/playlistsEmDestaque').get((req, res) => spotifyController.playlistsEmDestaque( req, res))
router.route('/obtervariosartistas').get( ( req, res) => spotifyController.obterVariosArtistas( req , res) )
router.route('/obtergeneros').get( ( req, res) => spotifyController.obterGeneros(req, res))
router.route('/tracksplaylist').get( ( req, res) => spotifyController.tracksPlaylist(req, res))
router.route('/authConfirmado').get( ( req, res) => spotifyController.authConfirmado(req, res))
router.route('/track').get( (req, res) => spotifyController.track(req,res))


module.exports = router;