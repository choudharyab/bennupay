'use strict';


const router = require('express').Router();


const apiRouter = require("./api")


router.post("/hello", (req, res, next) => {
    console.log("hello request with post method")
    let responseObj = {
        data: Object.keys(req.body).length? req.body: {
            message: "we are listening you request!!! Happy....."
        }
    }
    console.log("responseObj: ", responseObj)
    return res.json(responseObj)
})


router.use(apiRouter)

module.exports = router
