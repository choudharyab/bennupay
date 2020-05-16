'use strict';



require("dotenv").config()

let env = process.env.ENV;

process.env.NODE_ENV = process.env.ENV

let environ;
switch (env) {
    case 'local':
        environ = "LOCAL_";
        break;
    case "dev":
        environ = "DEV_";
        break;
    case "prod":
        environ = "PROD_";
        break;
}


if (!environ) {
    console.log("env not set");
    process.exit();
}

let setting = {
    host: process.env[environ + "MYSQL_DB_HOST_WRITE"],
    database: process.env[environ + "MYSQL_DB_NAME"],
    username: process.env[environ + "MYSQL_DB_USER"],
    password: process.env[environ + "MYSQL_DB_PASSWORD"],
    dialect: process.env[environ + "MYSQL_DB_TYPE"],
    port: process.env[environ + "MYSQL_DB_PORT"],
    pool: {
        max: 5,
        min: 0,
        idle: 100000,
        acquire: 50000,
        evict: 50000,
        handleDisconnects: true
    },
    // operatorsAliases: operatorsAliases,
    logging: false
};

const Enviroment = {}

Enviroment[process.env.NODE_ENV] = setting

module.exports = Enviroment