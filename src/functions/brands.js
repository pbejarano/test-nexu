const { app } = require('@azure/functions');
const controller = require("../controllers/csBrands");

app.http('brands', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: controller.Handler
});
