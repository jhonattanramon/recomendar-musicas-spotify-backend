const router = require("express").Router();

const UserController = require("../controllers/UserRegisterController");

router.route("/users").post((req, res) => UserController.create(req, res));
router.route("/users").get((req, res) => UserController.getAll(req, res));
router.route("/users/:id").get((req, res) => UserController.get(req, res));
router.route("/users/:id").delete((req, res) => UserController.delete(req, res));
router.route("/users/:id").put(( req, res ) => UserController.update(req, res))


module.exports = router;
