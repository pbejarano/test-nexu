const apiHandler = require("./csAPIMain");
const { PrismaClient } = require("@prisma/client");
const AzureReponse = require("../models/response");
const { UserInputError, ApplicationError, BadRequestError } = require("../models/baseErrors");

const prisma = new PrismaClient();

// Define route handlers
const routes = {
    'GET': GetModel,
    'PUT': PutModel
};

// Brand controllers
async function GetModel(request, context) {
    const lower = parseFloat(request.query.get('lower')) || null;
    const greater = parseFloat(request.query.get('greater')) || null;

    console.log("Greater than > ", greater);
    console.log("Lower than > ", lower);
    let arr_where = [];

    if(lower != null){
        arr_where.push({
            average_price: {
                lt: lower
            }
        })
    }
    if(greater != null){
        arr_where.push({
            average_price: {
                gt: greater
            }
        })
    }

    const models = await prisma.models.findMany({
        where: {
            AND : arr_where
        },
        select: {
            id: true,
            name: true,
            average_price: true
        }
    });
    return { status: 200, jsonBody: models };
}

async function PutModel(request, context) {
    let { average_price } = await request.json();
    if (!average_price) throw new UserInputError(`average price is required`);

    const id = parseInt(request.params?.id, 10) || 0;
    if (id == 0) throw new UserInputError(`id model is required`);

    if (average_price < 100000) throw new UserInputError(`the average price must be greater than 100,000.`);

    const updateModel = await prisma.models.update({
        where: {
            id: id,
        },
        data: {
            average_price: average_price,
        },
    })

    if (updateModel) {
        return { status: 200, jsonBody: updateModel };
    }
    throw new ApplicationError("Error updating data")
}

async function Handler(request, context) {
    return apiHandler.MainHandler(request, context, routes);
}

module.exports = {
    Handler,
    GetModel,
    PutModel
};