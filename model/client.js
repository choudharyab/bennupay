
'use strict';

const constants = require(rootDir +'/utils/constants')


module.exports = function (sequelize, DataTypes) {
    const Client = sequelize.define(constants.CLIENT_TABLE, {
        id: {primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, unique: true},
        clientId:{type : DataTypes.STRING ,allowNull :true},
        agencyId: {type: DataTypes.STRING, allowNull: true},
        name: {type: DataTypes.STRING, allowNull: true},
        email: {type: DataTypes.STRING, allowNull: true},
        phoneNumber: {type: DataTypes.STRING, allowNull: true},
        totalBill :{type :DataTypes.DOUBLE ,allowNull :false}
       
    },
    {
        indexes: [
            {
                fields: ['clientId', 'name']
            },

           
        ]
    });

    
    return Client
};