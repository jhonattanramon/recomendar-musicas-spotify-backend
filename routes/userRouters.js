const router = require("express").Router();
const {userController, spotifyController} = require('./controll')

router
  .route("/token")
  .get((req, res) => spotifyController.token(req, res));
router
  .route("/setdatauser")
  .get((req, res) => spotifyController.data(req, res));
router
  .route("/auth")
  .get((req, res) => spotifyController.auth(req, res));
router
  .route("/authConfirmado")
  .get((req, res) => spotifyController.authConfirmado(req, res));
router
  .route("/inforsuser")
  .get((req, res) => spotifyController.inforsUser(req, res));
router
  .route("/login")
  .get((req, res) => spotifyController.login(req, res));
router
  .route("/callback")
  .get((req, res) => spotifyController.callback(req, res));

  router
  .route("/registeruser")
  .post((req, res) => userController.registerUser(req, res))

router
.route("/responsetoken")
.post((req, res) => spotifyController.reponseToken(req,res))

router
.route("/getinfortoken")
.get( (req, res) => userController.getInforToken(req, res))
module.exports = router;
