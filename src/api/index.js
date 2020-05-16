'use strict';


const router = require('express').Router();
const apiRoutes = require('./routes/route1.1')


router.use('/v1.1',apiRoutes)

module.exports = router
