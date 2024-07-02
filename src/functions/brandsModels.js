const { app } = require('@azure/functions');
const controller = require("../controllers/csBrandsModels");

app.http('brandsModels', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: controller.Handler,
    route: 'brands/{id:int?}/models'
});
