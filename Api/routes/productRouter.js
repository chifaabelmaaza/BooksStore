const express = require('express');
const router = express.Router();
const multer = require('multer')

// Controllers
const ProductController = require('../controllers/ProductController');


//middleware
const checkAdmin = require('../middlewares/checkAdmin');

//Image-Save

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/products")
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})
const upload = multer({ storage: storage })


//Product Routes
router.get('/products-list', ProductController.getProducts);
router.get('/product-detail/:id',ProductController.findProductById);
router.post('/product-add',checkAdmin,upload.single('image'),  ProductController.saveProduct);
router.delete('/delete-product/:id',checkAdmin,ProductController.deleteProduct);
router.patch('/product-update/:id',checkAdmin,upload.single('image'),ProductController.updatProduct);

//Filters Routes
router.get('/product-by-category/:id', ProductController.getproductByCatg);
router.get('/product-by-brand/:id', ProductController.getproductByBrand);



module.exports = router;