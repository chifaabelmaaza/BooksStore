const Category = require('../models/Category');

// TODO: get All Categories

// *  ==================== START ====================
const getCategoriesFunction = async() => {
    try {
        const categories = await Category.find(); 
        return categories;

    } catch (error) {
        console.log(error);
        return error;
    }
}
// *  ==================== END ====================

// TODO: get Category By Id

// *  ==================== START ====================

const findCategoryByIdFunction = async(id) => {
    try {
        const category = await Category.findById(id)
        return category;

    } catch (error) {
        console.log(error);
        return error;
    }
}

// *  ==================== END ====================

// TODO: Add Category

// *  ==================== START ====================

const saveCategoryFunction= async(data) => {
    try {
        const savedcategory = await Category.create(data)
        return savedcategory;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// *  ==================== END ====================

// TODO: Update Category

// *  ==================== START ====================

const updateCategoryFunction = async(id,data) => {
    try {
        const updatedcategory = await Category.findOneAndUpdate(
            { _id: id },data,{ new: true });
        return updatedcategory;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// *  ==================== END ====================

// TODO: Delete Category

// *  ==================== START ====================

const deleteCategoryFunction = async(id) => {
    try {
        const deletedCategory = await Category.deleteOne(id)
        return  deletedCategory;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// *  ==================== END ====================

module.exports = {
    getCategoriesFunction,
    findCategoryByIdFunction,
    saveCategoryFunction,
    updateCategoryFunction,
    deleteCategoryFunction,

};