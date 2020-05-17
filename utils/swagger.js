const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Ads Triangle",
            version: "1.0.0",
            description:"This is api description",
            contact: {
                name: "Anup Choudhary",
                email: "anupc09@gmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1.1"
            }
        ]
    },
    apis: ["./src/api/routes/route1.1.js"]
};
module.exports = {
    swaggerOptions
}
