'use strict';

const controllers = require('../controller/apiController')
const router = require('express').Router()
// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
// const swagger = require(`${rootDir}/utils/swagger`);
// const swaggerDocs = swaggerJsDoc(swagger.swaggerOptions);

// router.use("/docs", swaggerUi.serve);
// router.get("/docs", swaggerUi.setup(swaggerDocs, { explorer: true }));

// /**
//  * @swagger
//  * /:
//  *  post:
//  *    description: Use to request all payment
//  *    responses:
//  *      '200':
//  *        description: A successful response
//  */
router.post("/bennupay", controllers.createPayment);


module.exports = router
