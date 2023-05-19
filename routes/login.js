const router = require("express").Router();

const LoginController = require("../controllers/loginController");

 router.route("/conect").post((req, res) => LoginController.login(req, res));

module.exports = router;
