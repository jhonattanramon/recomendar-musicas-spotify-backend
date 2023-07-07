const router = require('express').Router()
const playlistRouters = require("./playlistRouters")
const tracksRouters = require("./trackRouters")
const userRouters = require("./userRouters")
const searchRouters = require("./searchRouters")
router.use("/api", playlistRouters, tracksRouters, userRouters, searchRouters)
module.exports = router