const Brand = require('../models/Brand');

// TODO: get All Brands

// *  ==================== START ====================
const getBrandsFunction = async(req, res, next) => {
    try {
        const brands = await Brand.find()
        return brands;
    } catch (error) {
        console.log(error);
        return error;
    }
}
// *  ==================== END ====================

// TODO: get Brand By Id

// *  ==================== START ====================

const findBrandByIdFunction = async(id) => {
    try {
        const brand = await Brand.findById(id)
        return brand ;

    } catch (error) {
        console.log(error);
        return error;
    }
}

// *  ==================== END ====================

// TODO: Add Brand

// *  ==================== START ====================

const saveBrandFunction= async(data) => {
    try {
        const savedbrand = await Brand.create(data)
        return savedbrand;

    } catch (error) {
        console.log(error);
        return error;
    }
}

// *  ==================== END ====================

// TODO: Update Brand

// *  ==================== START ====================

const updatBrandFunction = async(id,data) => {
    try {
        const updatedbrand = await Brand.findOneAndUpdate(
            { _id: id },data,{ new: true });
        return updatedbrand;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// *  ==================== END ====================

// TODO: Delete Brand

// *  ==================== START ====================

const deleteBrandFunction = async(id) => {
    try {
        const deletedBrand = await Brand.deleteOne(id)
        return deletedBrand;

    } catch (error) {
        console.log(error);
        return error;
    }
}

// *  ==================== END ====================

module.exports = {
    getBrandsFunction,
    findBrandByIdFunction,
    saveBrandFunction,
    updatBrandFunction,
    deleteBrandFunction,

};