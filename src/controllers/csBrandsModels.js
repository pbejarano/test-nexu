const apiHandler = require("./csAPIMain");
const { PrismaClient } = require("@prisma/client");
const { UserInputError, ApplicationError, BadRequestError } = require("../models/baseErrors");

const prisma = new PrismaClient();
// Define route handlers
const routes = {
    'GET': GetBrands,
    'POST': PostBrand,
    'DELETE': DeleteBrand,
    'PUT': PutBrand
};

// Brand controllers
async function GetBrands(request, context) {
    const name = request.query.get('name') || 'world';
    const id = parseInt(request.params?.id, 10) || 0;

    if (id > 0) {
        const models = await prisma.models.findMany({
            where: {
                id_brand: id
            },
            select: {
                id: true,
                name: true,
                average_price: true
            }
        });
        return { status: 200, jsonBody: models };
    }
    return { status: 400, body: `id not specified` };
}

async function PostBrand(request, context) {
    try{
        let {name, average_price} = await request.json();
        if (!name) throw new UserInputError(`name is required`);
        // if (!average_price) throw new UserInputError(`average price is required`);

        const id = parseInt(request.params?.id, 10) || 0;
        if (id == 0) throw new UserInputError(`id brand is required`);
        //check average price if is opcional
        if(!average_price) average_price = 100000;
        //check if exist id brand
        const rbrand = await prisma.brands.findFirst({
            where: {
                id: id,
            },
        })
        if(!rbrand) throw new UserInputError(`brand not exist`);
        //check if model name exist
        const rmodel = await prisma.models.findFirst({
            where: {
                AND:[
                    {name: name},
                    {id_brand: id},
                ]
            },
        })

        if (!rmodel) {
            const newModel = await prisma.models.create({
                data: {
                  name: name,
                  average_price: average_price,
                  id_brand: id
                },
              })
            return { status: 201, jsonBody: newModel };
        }
        return { status: 406, body: `model ${name} is already exist` };
    }
    catch(ex){
        throw ex;
    }
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

async function Handler(request, context) {
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