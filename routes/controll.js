const ClassControll = require("../controllers/spotifyApiController");
const UserController = require("../controllers/userController");
const spotifyController = new ClassControll();
const userController = new UserController()
module.exports = {spotifyController, userController}