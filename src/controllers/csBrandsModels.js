const apiHandler = require("./csAPIMain");

// Define route handlers
const routes = {
    'GET': GetBrands,
    'POST': PostBrand,
    'DELETE': DeleteBrand,
    'PUT': PutBrand
};

// Brand controllers
function GetBrands(request, context) {
    const name = request.query.get('name') || 'world';
    const id = request.params?.id || 0;
    return { status: 200, body: `Hello Brand Models!, ${id}!` };
}

async function PostBrand(request, context) {
    const requestBody = await request.json();
    const id = request.params?.id || 0;
    return { status: 201, body: `Received POST ${id} request with data: ${JSON.stringify(requestBody)}` };
}

function DeleteBrand(request, context) {
    return { status: 200, body: `Received DELETE request` };
}

async function PutBrand(request, context) {
    const requestBody = await request.json();
    return { status: 200, body: `Received PUT request with data: ${JSON.stringify(requestBody)}` };
}

async function Handler(request, context){
    return apiHandler.MainHandler(request, context, routes);
}

function GetBrandModels(request, context) {
    const brandId = request.params.id;
    return { status: 200, body: `List of models for brand ${brandId}` };
}

module.exports = {
    Handler,
    GetBrands,
    PostBrand,
    DeleteBrand,
    PutBrand,
    GetBrandModels
};