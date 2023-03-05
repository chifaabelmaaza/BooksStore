const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');

//Middlewares
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');

//User Routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logOut);
router.put('/update-user',checkAuth, userController.updateClient);
router.get('/user-info/:id', userController.getUserById);
router.put('/update-userpwd/:id',checkAuth, userController.updateUserPassword);


//Cart 
router.post('/add-2cart',checkAuth, ProductController.addtocart);
router.delete('/remove-frcart/:id',checkAuth, ProductController.deletefromcart);
router.get('/user-cart',checkAuth, ProductController.getcart);
router.post('/update-cart',checkAuth, ProductController.updateCart);


//Order

router.post('/add-order',checkAuth, ProductController.createOrder);
router.get('/orders',checkAuth, ProductController.getClientOrders);
router.post('/order-cancel',checkAuth, ProductController.cancelOrder);
router.post('/order',checkAuth, ProductController.getOrderById);
router.get('/lastOrders',checkAuth, ProductController.lastFiveOrders);





//Admin routes
router.post('/admin-login', userController.loginAdmin);
router.post('/check-token', userController.verifieToken);
router.get('/get-connected-user', userController.getConnectedUser); 
router.get('/users',checkAdmin,userController.getUsers);
router.get('/admins',checkAdmin,userController.getAdmins);
router.put('/update-admin/:id',checkAdmin, userController.updateUser);
router.delete('/delete-user/:id',checkAdmin, userController.deleteUser);
router.post('/add-user',checkAdmin, userController.addUser);
router.post('/add-admin',checkAdmin, userController.addAdmin);
router.put('/update-admpwd/:id',checkAdmin, userController.updateUserPassword);
router.put('/resetpwd/:id',checkAdmin, userController.resetPassword);

router.put('/update-order',checkAdmin, ProductController.updateOrderStatus);
router.get('/all-orders',checkAdmin, ProductController.getAllOrders);





module.exports = router;
