const { app } = require('@azure/functions');

app.http('test', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        const data = []

        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';

        return { jsonBody: data, headers: {
            "Content-Type": "application/json; charset=utf-8"
        }};
    }
});
