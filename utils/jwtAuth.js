'use strict';

const dbRead = require('./../utils/dbRead');
const Constants = require('./consts');
const jwt = require('jsonwebtoken');


const jwtAdminAuth = ((req, res, next) => {

    console.log('admin jwt called ' + JSON.stringify(req.headers));

    const token = req.headers.adminauth.split(" ")[1];

    console.log('jwt user called');

    jwt.verify(token, process.env.ADMIN_JWT_SECRET, function (err, payload) {
        if (payload) {
            dbRead.admin.findOne({where: {email_id: payload.email_id}}).then(
                (userInfo) => {
                    req.user = userInfo;
                    next()
                }
            )
        } else {
            res.status(401).json({
                status: Constants.ERROR_401,
                message: "You are not authorized"
            })
        }
    })


});


module.exports = {
	jwtAdminAuth
}