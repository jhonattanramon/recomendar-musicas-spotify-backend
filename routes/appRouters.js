const router = require("express").Router();

const PlaylistController = require("../controllers/PlaylistController");
const UserController = require("../controllers/UserController");

router
  .route("/createplaylist")
  .post((req, res) => PlaylistController.createPlaylist(req, res));

router
  .route("/createuser")
  .post((req, res) => UserController.createUser(req, res));

router
  .route("/deleteuser/:id")
  .delete((req, res) => UserController.deleteUser(req, res));

router
.route("/getAllUsers")
.get((req, res) => UserController.getAllUsers(req, res));

router
.route("/getuser/:id")
.get((req, res) => UserController.getUser(req, res));

router
  .route("/updateuser/:id")
  .put((req, res) => UserController.updateUser(req, res));

  router
  .route("/loginuser")
  .post( (req, res) => UserController.login(req, res))

module.exports = router;
