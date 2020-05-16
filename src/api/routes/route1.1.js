'use strict';

const controllers = require('../controller/apiController')
const router = require('express').Router()


router.post("/", controllers.createPayment);

module.exports = router
