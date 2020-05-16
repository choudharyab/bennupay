'use strict';


const constants = require("./constants");

const success = (response, statusCode, message = "", data = null) => {
    let responseObj = {};
    data? responseObj.data = data: null;
    responseObj.status = statusCode? statusCode: constants.SUCCESS_200.STATUS;
    responseObj.message = message? message: constants.SUCCESS_200.MESSAGE; 
    response.statusCode = responseObj.status;
    response.json(responseObj);
}


const failed = (response, statusCode, message, hint=null) => {
    let responseObj = {};
    responseObj.status = statusCode? statusCode: constants.ERROR_500.STATUS;
    responseObj.message = message? message: constants.ERROR_500.MESSAGE;
    response.statusCode = responseObj.status;
    response.json(responseObj);
}


module.exports = {
    success, 
    failed
}