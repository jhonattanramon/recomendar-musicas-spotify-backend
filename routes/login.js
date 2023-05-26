const router = require("express").Router();

const LoginController = require("../controllers/loginController");

 router.route("/login").post((req, res) => LoginController.login(req, res));

module.exports = router;
