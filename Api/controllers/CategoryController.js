const categoryService = require('../services/categoryService');

const Category = require('../models/Category');
const Product = require('../models/Product');

// TODO: get All Categories

// *  ==================== START ====================
const getCategories = async(req, res, next) => {
    try {
        // console.log('this is the products number')

        categoryService.getCategoriesFunction().then(
            (result) => {
                result.map((category) =>{
                    // console.log(category._id.toString());
                    Product.countDocuments({
                        categoryId: category._id.toString(),
                      }).then((result) => {
                        var data = {}
                        data.product_number =result
                        data.updatedAt = new Date()
                        const updatecategory = {
                            $set: data
                        }
                        // console.log(product_number)
                        Category.findOneAndUpdate({ _id: category._id.toString() },updatecategory,{ new: true }).then((result) => {
                                // console.log(result)
                               category=result;
                            }).catch((error) => {
                                console.log(error)
                                
                            });   
                    }).catch((error) => {
                        console.log(error)
                    });
                      
                }
                )
                // console.log(result)

                res.status(201).json({ success: true, categories: result })
            }
            
        ).catch((error) => {
            console.log(error)
        }); 
        
        

    } catch (error) {
        console.log(error);
        res.json({ message: 'Failed to get categories list' })
    }
}
// *  ==================== END ====================

// TODO: get Category By Id

// *  ==================== START ====================

const findCategoryById = async(req, res, next) => {
    try {
        const category = await categoryService.findCategoryByIdFunction(req.params.id)
        res.status(201).json({ success: true, category: category });

    } catch (error) {
        res.json({ message: 'Category does not exist' })

    }
}

// *  ==================== END ====================

// TODO: Add Category

// *  ==================== START ====================

const saveCategory= async(req, res, next) => {
    // console.log(req.body.name)
    try {
        const category = new Category({
            name: req.body.name,
            image: req.file.filename,
        })
        const savedcategory = await categoryService.saveCategoryFunction(category)
        res.status(201).json({
            success: true,
            message: 'category added successfully',
            savedcategory,
        });

    } catch (error) {
        res.status(403).json({ message: 'Failed to save the new category data' })
    }
}

// *  ==================== END ====================

// TODO: Update Category

// *  ==================== START ====================

const updateCategory = async(req, res, next) => {
    try {
        // console.log(req.file.filename)
        var data = {}
        // console.log(req.body.name)

        if (req.body.name) {
            data.name = req.body.name
        }
        if(req.file) {
            data.image = req.file.filename
        }
        data.updatedAt = new Date()
        const updatecategory = {
            $set: data
        }
        const updatedcategory = await categoryService.updateCategoryFunction({ _id: req.params.id }, updatecategory)
        res.status(201).json({
            success: true, 
            message: 'Category updated successfully',
            updatedcategory
        });
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: 'An error occurred! Category does not exist' })
    }
}

// *  ==================== END ====================

// TODO: Delete Category

// *  ==================== START ====================

const deleteCategory = async(req, res, next) => {
    try {
        const deletedCategory = await categoryService.deleteCategoryFunction({ _id: req.params.id })
        res.status(201).json({ 
            success: true,
            message: 'Category deleted successfully',
            deletedCategory
        });

    } catch (error) {
        res.json({ message: 'Category does not exist' })
    }
}

// *  ==================== END ====================

module.exports = {
    getCategories,
    findCategoryById,
    saveCategory,
    updateCategory,
    deleteCategory,

};