const express = require('express');
const router = express.Router();
const multer = require('multer')

// Controllers
const BrandController = require('../controllers/BrandController');


//middleware
const checkAdmin = require('../middlewares/checkAdmin');

//Image-Save

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/brands")
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})
const upload = multer({ storage: storage })


//Brand Routes
router.get('/brands-list',BrandController.getBrands);
router.get('/brand-detail/:id',BrandController.findBrandById);
router.post('/brand-add',checkAdmin,upload.single('image'), BrandController.saveBrand);
router.delete('/delete-brand/:id',checkAdmin,BrandController.deleteBrand);
router.put('/brand-update/:id',checkAdmin,upload.single('image') ,BrandController.updatBrand);




module.exports = router;