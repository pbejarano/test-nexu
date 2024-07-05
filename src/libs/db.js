const SimpleJsonDb = require('simple-json-db');

// Initialize the database
const db = new SimpleJsonDb('./models.json');

// Function to get all models
function getAllModels() {
    return Object.values(db.JSON());
}

// Function to get a model by ID
function getModelById(id) {
    const models = getAllModels();
    return models.find(model => model.id === id);
}

// Function to add a new model
function addModel(newModel) {
    const models = getAllModels();
    // Find the maximum current ID and increment it for the new model
    const maxId = Math.max(...Object.keys(models).map(id => parseInt(id, 10)), 0);
    const newId = maxId + 1;

    newModel.id = newId;
    models[newModel.id] = newModel;
    // models.push(newModel);
    db.set('models', models);
    return models;
}

// Function to update a model by ID
function updateModel(id, updatedData) {
    const models = getAllModels();
    const index = models.findIndex(model => model.id === id);
    if (index !== -1) {
        models[index] = { ...models[index], ...updatedData };
        db.set('models', models);
    } else {
        throw new Error('Model not found');
    }
}

// Get average prices by brand
function getBrands() {
    const models = getAllModels();
    const brandPrices = {};

    models.forEach(model => {
        if (!brandPrices[model.brand_name]) {
            brandPrices[model.brand_name] = { total: 0, count: 0, id: model.id };
        }
        brandPrices[model.brand_name].total += model.average_price;
        brandPrices[model.brand_name].count += 1;
    });

    return Object.keys(brandPrices).map(brand => ({
        id: brandPrices[brand].id,
        nombre: brand,
        average_price: brandPrices[brand].total / brandPrices[brand].count
    }));
}

function getBrandsByName(name) {
    const models = getAllModels();
    return models.find(model => model.brand_name.toLowerCase() === name.toLowerCase());
}

function getModelsByBrand(_idBrand) {
    const models = getAllModels();
    const brand = getModelById(parseInt(_idBrand));

    return models.filter((cv) => {
        if (cv.brand_name == brand.brand_name) {
            // console.log("CV", cv);
            delete cv.brand_name;
            // console.log("CV", cv);
            return true;
        }
    });

    // return models.filter(models => models.brand_name == brand.brand_name);
}

// Function to delete a model by ID
function deleteModel(id) {
    const models = getAllModels();
    const filteredModels = models.filter(model => model.id !== id);
    db.set('models', filteredModels);
}


module.exports = {
    getAllModels,
    getModelById,
    addModel,
    updateModel,
    deleteModel,
    getBrands,
    getModelsByBrand,
    getBrandsByName
};