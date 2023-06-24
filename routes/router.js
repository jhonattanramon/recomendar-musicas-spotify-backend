const router = require('express').Router()

const appRouter = require('./APP')

router.use('/',  appRouter)


module.exports = router