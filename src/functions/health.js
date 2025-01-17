const { app } = require('@azure/functions');
const controller = require("../controllers/csHealth");

app.http('health', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: controller.Handler
});
