const router = require('express').Router()

const userRouter = require('./user')
const loginRouter = require('./login')

router.use('/', userRouter, loginRouter)


module.exports = router