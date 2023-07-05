const router = require('express').Router()

const appRouter = require("./appRouters")
const spotifyRouters = require("./spotifyRouters")

router.use('/api',  appRouter)
router.use("/apispotify", spotifyRouters)


module.exports = router