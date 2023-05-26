const router = require("express").Router();

const LoginController = require("../controllers/loginController");

 router.route("/login").post((req, res) => {
   res.header("access-Control-Allow-Origin", "*");
   LoginController.login(req, res);
 });

module.exports = router;
