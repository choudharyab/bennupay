'use strict';

const constants = require(rootDir +'/utils/constants')


module.exports = function (sequelize, DataTypes) {
    const Agency = sequelize.define(constants.AGENCY_TABLE, {
        id: {primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, unique: true},
        agencyId: {type: DataTypes.STRING, allowNull: true},
        name: {type: DataTypes.STRING, allowNull: true},
        address1: {type: DataTypes.STRING, allowNull: true},
        address2: {type: DataTypes.STRING, allowNull: true},
        state: {type: DataTypes.STRING, allowNull: false, unique: true},
        city: {type: DataTypes.STRING, allowNull: true},
        phoneNumber: {type: DataTypes.STRING, allowNull: true},
       
    },
    {
        indexes: [
            {
                fields: ['agencyId', 'name']
            },

           
        ]
    });

    Agency.associations = (db) => {
        
        Agency.hasMany(db[constants.CLIENT_TABLE], {
            foreignKey: 'agencyId',
            onDelete: 'cascade'
        });
       
    };
    return Agency
};