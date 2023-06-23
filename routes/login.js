const router = require("express").Router();

const LoginController = require("../controllers/loginController");

 router.route("/login").post((req, res) => LoginController.login(req, res));
 router
   .route("/tokenapp")
   .get((req, res) => LoginController.tokenApp(req, res));

 router
   .route("/validadetoken")
   .post((req, res) => LoginController.validadeToken(req, res));

module.exports = router;
