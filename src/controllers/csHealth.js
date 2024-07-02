const apiHandler = require("./csAPIMain");

// Define route handlers
const routes = {
    'GET': GetHealth,
    'POST': PostHealth,
    'DELETE': DeleteHealth,
    'PUT': PutHealth
};

// Health controllers
function GetHealth(request, context) {
    const name = request.query.get('name') || 'world';
    return { status: 200, body: `Hello, ${name}!` };
}

async function PostHealth(request, context) {
    const requestBody = await request.json();
    return { status: 201, body: `Received POST request with data: ${JSON.stringify(requestBody)}` };
}

function DeleteHealth(request, context) {
    return { status: 200, body: `Received DELETE request` };
}

async function PutHealth(request, context) {
    const requestBody = await request.json();
    return { status: 200, body: `Received PUT request with data: ${JSON.stringify(requestBody)}` };
}

async function Handler(request, context){
    /* context.log(`HTTP function processed request for URL "${request.url}" with method "${request.method}"`);

    // Construct the route key
    const routeKey = `${request.method} ${request.url.split('?')[0]}`;

    // Find the handler for the route
    const handler = routes[request.method];

    // If handler exists, call it; otherwise, return 405 Method Not Allowed
    if (handler) {
        return await handler(request, context);
    } else {
        return { status: 405, body: 'Method Not Allowed' };
    } */
    return apiHandler.MainHandler(request, context, routes);
}

module.exports = {
    Handler,
    GetHealth,
    PostHealth,
    DeleteHealth,
    PutHealth
};