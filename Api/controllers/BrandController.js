const brandService = require('../services/brandService');
const Brand = require('../models/Brand');
const Product = require('../models/Product');


// TODO: get All Brands

// *  ==================== START ====================
const getBrands = async(req, res, next) => {
    try {
        const brands = await brandService.getBrandsFunction()
        brandService.getBrandsFunction().then(
            (result) => {
                result.map((brand) =>{
                    // console.log(brand._id.toString());
                    Product.countDocuments({
                        brandId: brand._id.toString(),
                      }).then((result) => {
                        var data = {}
                        data.product_number =result
                        data.updatedAt = new Date()
                        const updatebrand = {
                            $set: data
                        }
                        // console.log(product_number)
                        Brand.findOneAndUpdate({ _id: brand._id.toString() },updatebrand,{ new: true }).then((result) => {
                                // console.log(result)
                               brand=result;
                            }).catch((error) => {
                                console.log(error)
                                
                            });   
                    }).catch((error) => {
                        console.log(error)
                    });
                      
                }
                )
                console.log(result)
                res.status(201).json({ success: true, brands: brands });
            }
            
        ).catch((error) => {
            console.log(error)
        });   
        

    } catch (error) {
        console.log(error);
        res.json({ message: 'Failed to get brands list' })
    }
}
// *  ==================== END ====================

// TODO: get Brand By Id

// *  ==================== START ====================

const findBrandById = async(req, res, next) => {
    try {
        const brand = await brandService.findBrandByIdFunction(req.params.id)
        res.status(201).json({ success: true, brand: brand });

    } catch (error) {
        console.log(error);
        res.json({ message: 'Brand does not exist' })

    }
}

// *  ==================== END ====================

// TODO: Add Brand

// *  ==================== START ====================

const saveBrand= async(req, res, next) => {
    // console.log(req.body)
    try {
        const brand = new Brand({
            name: req.body.name,
            image: req.file.filename,
        })
        
        const savedbrand = await brandService.saveBrandFunction(brand)
        res.status(201).json({
            success: true,
            message: 'Brand added successfully',
            savedbrand,
        });

    } catch (error) {
        console.log(error);
        res.status(403).json({ message: 'Failed to save the new brand data' })
    }
}

// *  ==================== END ====================

// TODO: Update Brand

// *  ==================== START ====================

const updatBrand = async(req, res, next) => {     
    // console.log(req.body)
    try {
        var data = {}
        
        if (req.body.name) {
            data.name = req.body.name
        }
        if(req.file) {
            data.image = req.file.filename
        }
        data.updatedAt = new Date()
        const updatbrand = {
            $set: data
        }
        // console.log(data)
        const updatedbrand = await brandService.updatBrandFunction({ _id: req.params.id }, updatbrand)

        res.status(201).json({
            success: true, 
            message: 'Brand updated successfully',
            updatedbrand
        });
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: 'An error occurred! Brand does not exist' })
    }
}

// *  ==================== END ====================

// TODO: Delete Brand

// *  ==================== START ====================

const deleteBrand = async(req, res, next) => {
    try {
        const deletedBrand = await brandService.deleteBrandFunction({ _id: req.params.id })
        res.status(201).json({ 
            success: true,
            message: 'Brand deleted successfully',
            deletedBrand
        });

    } catch (error) {
        console.log(error);
        res.json({ message: 'Brand does not exist' })
    }
}

// *  ==================== END ====================

module.exports = {
    getBrands,
    findBrandById,
    saveBrand,
    updatBrand,
    deleteBrand,

};