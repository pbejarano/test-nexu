async function MainHandler(request, context, _routes){
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

module.exports = {
    MainHandler
};