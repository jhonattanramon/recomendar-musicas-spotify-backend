const router = require("express").Router();
const {userController, spotifyController} = require('./controll')

router
  .route("/token")
  .get((req, res) => spotifyController.token(req, res));
router
  .route("/setdatauser")
  .get((req, res) => userController.setDataUser(req, res));
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
  .route("/refreshtoken")
  .post((req, res) => spotifyController.refreshToken(req, res))

  router
  .route("/registeruser")
  .post((req, res) => userController.registerUser(req, res))

router
.route("/getinfortoken")
.get( (req, res) => spotifyController.getInforToken(req, res))

router
.route("/logout")
.get( (req, res) => userController.setLogout(req, res))

router
.route("/stateAuth")
.get( (req, res) => userController.stateAuth(req, res))

module.exports = router;
