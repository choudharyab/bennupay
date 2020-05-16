const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition :{
        info :{
            title :'Ads Triangle',
            description :'This is api description',
            contact :{
                name :'Anup Choudhary'
            },
            server :['http://localhost:3000']
        }
    },
    apis:['./index.js']
}
module.exports = {
    swaggerOptions
}