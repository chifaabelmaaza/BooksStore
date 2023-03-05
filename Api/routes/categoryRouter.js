const express = require('express');
const router = express.Router();
const multer = require('multer')

// Controllers
const CategoryController = require('../controllers/CategoryController');


//middleware
const checkAdmin = require('../middlewares/checkAdmin');

//Image-Save

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/categories")
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})
const upload = multer({ storage: storage })


//Category Routes
router.get('/categories-list', CategoryController.getCategories);
router.get('/category-detail/:id',CategoryController.findCategoryById);
router.post('/category-add',checkAdmin,upload.single('image'),  CategoryController.saveCategory);
router.delete('/delete-category/:id',checkAdmin,CategoryController.deleteCategory);
router.put('/category-update/:id',checkAdmin,upload.single('image'),CategoryController.updateCategory);


module.exports = router;