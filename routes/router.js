const router = require('express').Router()
const spotifyRouters = require("./spotifyRouters")
router.use("/api", spotifyRouters)


module.exports = router