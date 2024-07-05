const { app } = require('@azure/functions');
const controller = require("../controllers/csModels");

app.http('models', {
    methods: ['GET', 'PUT'],
    authLevel: 'anonymous',
    handler: controller.Handler,
    route: 'models/{id:int?}'
});
