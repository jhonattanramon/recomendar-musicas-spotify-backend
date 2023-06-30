const router = require('express').Router()

const appRouter = require("./appRouters")

router.use('/',  appRouter)


module.exports = router