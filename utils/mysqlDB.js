'use strict';

const fs = require("fs")
const path = require('path')
const dbConf = require('./dbConf')
const Sequelize = require('sequelize')
const constants = require("./constants")

const db = {};

let env = process.env.ENV;

let setting = dbConf[process.env.ENV]


const sequelize = new Sequelize(setting);

// sequelize.sync({
//     force: false
// });

const modelPath = `${rootDir}/model`;
const excludeFile = ['index.js', 'fileRecord.js', 'fileUploadType.js']

fs.readdirSync(modelPath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && !excludeFile.includes(file) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(modelPath, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associations(db);
  }
});


db.Sequelize = Sequelize;
db.sequelize = sequelize;


module.exports = db;
