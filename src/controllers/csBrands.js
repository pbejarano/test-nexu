const apiHandler = require("./csAPIMain");
const { PrismaClient } = require("@prisma/client");
const AzureReponse = require("../models/response");
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
    // Get avg from db
    const averages = await prisma.models.groupBy({
        by: ["id_brand"],
        _avg: {
            average_price: true
        }
    })
    //  Get just posts
    const brandsdata = await prisma.brands.findMany({
        select: {
            id: true,
            nombre: true
        },
        orderBy: {
            id: "asc"
        }
    });
    // then match the ratings with posts
    const data = brandsdata.map((_brands, idx) => {
        const avgprice = averages.find((m) => m.id_brand == _brands.id)?._avg.average_price;
        console.log('avgprice >' + _brands.nombre, avgprice)
        return {
            ..._brands,
            // avvg: averages[idx]._avg.average_price
            average_price: avgprice ?? 0
        }
    });

    // Get avg from db raw -- another way to do this ^
    /* const [brandsavg] = await prisma.$transaction([
        prisma.$queryRaw`SELECT b.id, b.nombre, AVG(j.average_price) as average_price from models_json j INNER JOIN brands b ON b.nombre = j.brand_name GROUP BY b.id`
    ]) */

    return { status: 200, jsonBody: data };
}

async function PostBrand(request, context) {
    try{
        const requestBody = await request.json();
        if (!requestBody?.name) {
            return { status: 400, body: `name is required` };
        }
        const brandname = requestBody.name;

        const rbrand = await prisma.brands.findFirst({
            where: {
                nombre: brandname,
            },
        })

        if (!rbrand) {
            const newbrand = await prisma.brands.create({
                data: {
                  nombre: brandname,
                },
              })
            return { status: 201, jsonBody: newbrand };
        }
        return { status: 406, body: `brand ${brandname} is already exist` };
    }
    catch(ex){
        throw new BadRequestError('JSON no Proporcionado');
    }
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