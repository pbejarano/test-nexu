const { UserInputError, ApplicationError, BadRequestError } = require("../models/baseErrors");
const AzureReponse = require("../models/response");

async function MainHandler(request, context, _routes) {
    const rfn = new AzureReponse();
    try {

        context.log(`HTTP function processed request for URL "${request.url}" with method "${request.method}"`);

        // Construct the route key
        const routeKey = `${request.method} ${request.url.split('?')[0]}`;

        // Find the handler for the route
        const handler = _routes[request.method];

        // If handler exists, call it; otherwise, return 405 Method Not Allowed
        if (handler) {
            return await handler(request, context);
        } else {
            return { status: 405, body: 'Method Not Allowed' };
        }
    }
    catch (ex) {
        console.log("EX", ex);
        console.error("ERROR MAIN", ex);
        /* context.errorlog(ex);
        context.error(ex);*/
        console.log("----------------------------------------------");
        rfn.status = 'error';
        rfn.message = ex.message;
        rfn.data = ex;

        if(ex instanceof UserInputError){
            rfn.code = 406;
        }
        else if(ex instanceof BadRequestError){
            rfn.code = 400;
        }
        else if(ex instanceof ApplicationError){
            rfn.code = 409;
        }
        else{
            rfn.code = 501;
        }

        return { status: rfn.code, jsonBody: rfn };
    }
}

module.exports = {
    MainHandler
};