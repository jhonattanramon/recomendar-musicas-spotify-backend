const router = require('express').Router()

const appRouter = require('./App')

router.use('/',  appRouter)


module.exports = router