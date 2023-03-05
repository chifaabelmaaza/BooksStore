const jwt = require('jsonwebtoken');

//Models
const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

///Service
const productService = require('../services/produitService');

// TODO: Get Products List

// *  ==================== START ====================
const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProductsFunction();
    res.status(201).json({ success: true, products: products });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Failed to get products list' });
  }
};

// *  ==================== END ====================

// TODO: get Product By Id

// *  ==================== START ====================
const findProductById = async (req, res, next) => {
  try {
    const product = await productService.findProductByIdFunction(req.params.id);
    res.status(201).json({ success: true, product: product });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'product does not exist' });
  }
};

// *  ==================== END ====================

// TODO: Add Product

// *  ==================== START ====================

const saveProduct = async (req, res, next) => {
  console.log(req.body)
  try {
    const product = new Product({
      name: req.body.name,
      categoryId: req.body.categoryId,
      brandId: req.body.brandId,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
      image: req.file.filename,
    });
    const savedproduct = await productService.saveProductFunction(product);
    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      savedproduct,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Failed to save the new product data' });
  }
};

// *  ==================== END ====================
// TODO: Update Product
// *  ==================== START ====================
const updatProduct = async (req, res, next) => {
  console.log(req.body);
  try {
    var data = {};
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.categoryId) {
      data.categoryId = req.body.categoryId;
    }
    if (req.body.brandId) {
      data.brandId = req.body.brandId;
    }
    if (req.body.description) {
      data.description = req.body.description;
    }
    if (req.body.quantity) {
      data.quantity = req.body.quantity;
    }
    if (req.body.price) {
      data.price = req.body.price;
    }
    if (req.file) {
      data.image = req.file.filename;
    }
    data.updatedAt = new Date();
    const updatproduct = {
      $set: data,
    };
    const updatedproduct = await productService.updatProductFunction(
      { _id: req.params.id },
      updatproduct
    );
    res.status(201).json({
      success: true,
      message: 'Product updated successfully',
      updatedproduct,
    });
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .json({ message: 'An error occurred! Product does not exist' });
  }
};

// *  ==================== END ====================

// TODO: Delete Product

// *  ==================== START ====================

const deleteProduct = async (req, res, next) => {
  try {
    const deletedproduct = await productService.deleteProductFunction({
      _id: req.params.id,
    });
    res.status(201).json({
      success: true,
      message: 'Product deleted successfully',
      deletedproduct,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Product does not exist' });
  }
};

// *  ==================== END ====================

/* TODO: Filters */

// TODO: get Product By Category

// *  ==================== START ====================

const getproductByCatg = async (req, res, next) => {
  try {
    const products = await productService.getproductByCatgFunction(
      res,
      req.params.id
    );
    // console.log(products);
    res.status(201).json({
      success: true,
      message: 'Products List',
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Failed to get Products list' });
  }
};

// *  ==================== END ====================

// TODO: get Product By Brand

// *  ==================== START ====================

const getproductByBrand = async (req, res, next) => {
  try {
    const products = await productService.getproductByBrandFunction(
      res,
      req.params.id
    );
    res.status(201).json({
      success: true,
      message: 'Products List',
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Failed to get Products list' });
  }
};

// *  ==================== END ====================

// TODO: Add To Cart

// *  ==================== START ====================

const addtocart = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      let cleanedToken = token.replace('Bearer ', '');

      const decoded = jwt.decode(cleanedToken, process.env.JWT_SECRET);
      const idUser = decoded.data.id;
      const { idproduct } = req.body;
      // console.log(idproduct)

      Product.findById(idproduct)
        .then((product) => {
          // console.log(product)
          if (product.quantity >= 1) {
            Cart.findOne({ idUser: idUser })
              .then((result) => {
                const exist = result.lproduct.find(
                  (x) => x.idproduct.toString() === idproduct
                );
                // console.log('exist',exist);
                if (!exist) {
                  console.log('m in');
                  result.lproduct = [
                    ...result.lproduct,
                    { idproduct: idproduct, qty: 1 },
                  ];
                  result
                    .save()
                    .then((savedCart) => {
                      res.status(201).json({
                        success: true,
                        message: 'Cart saved sucessfully',
                        savedCart,
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      res.status(403).json({ message: 'cart not saved', err });
                    });
                } else {
                  return res
                    .status(403)
                    .json({ message: 'Product already in cart ' });
                }
              })
              .catch((err) => {
                console.log(err);
                res.status(403).json({ message: 'cart not found', err });
              });
          } else {
            res
              .status(403)
              .json({ message: 'product out of the stock', error });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(403).json({ message: 'product not found', err });
        });
    } else {
      res.status(403).json({ sucess: false, error: 'token not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Error adding product to cart', error });
  }
};

// *  ==================== END ====================

// TODO: Update the quantity of the product in the cart

// *  ==================== START ====================

const updateCart = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      let cleanedToken = token.replace('Bearer ', '');

      const decoded = jwt.decode(cleanedToken, process.env.JWT_SECRET);

      const idUser = decoded.data.id;
      const { idproduct, qty } = req.body;
      // console.log(idproduct,qty)

      Cart.findOne({ idUser: idUser })
        .then((result) => {
          const exist = result.lproduct.find(
            (x) => x.idproduct.toString() === idproduct
          );

          if (exist) {
            // console.log('m in')
            result.lproduct = result.lproduct.map((x) =>
              x.idproduct.toString() === idproduct
                ? { idproduct: idproduct, quantity: qty >= 1 ? qty : 1 }
                : x
            );
            result
              .save()
              .then((savedCart) => {
                res.status(201).json({
                  success: true,
                  message: 'Cart saved sucessfully',
                  savedCart,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(403).json({ message: 'cart not saved', err });
              });
          } else {
            return res.status(403).json({ message: 'Product not in cart ' });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(403).json({ message: 'cart not found', err });
        });
    } else {
      res.status(403).json({ sucess: false, error: 'token not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Error adding product to cart', error });
  }
};

// *  ==================== END ====================

// TODO: Create Order

// *  ==================== START ====================

const createOrder = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      let cleanedToken = token.replace('Bearer ', '');

      const decoded = jwt.decode(cleanedToken, process.env.JWT_SECRET);
      const idUser = decoded.data.id;
      const { productsList, phone, adress } = req.body;
      let total = 0;
      productsList.map((product) => {
        total += product.price * product.quantity;
      });

      // Check if all the products are in the stock with the quantity required

      const products = await Product.find({
        _id: { $in: productsList.map((x) => x.idProduct) },
      });
      const stock = products.every((x) =>
        productsList.find(
          (y) =>
            y.idProduct.toString() === x._id.toString() &&
            y.quantity <= x.quantity
        )
      );

      if (!stock) {
        return res
          .status(403)
          .json({ message: 'Some products are out of the stock' });
      }

      const order = new Order({
        idUser: idUser,
        productsList: productsList,
        total: total,
        phone: phone,
        adress: adress,
        status: 'pending',
      });

      order
        .save()
        .then((savedOrder) => {
          // update the quantity of the product in the stock
          productsList.map((product) => {
            Product.findById(product.idProduct)
              .then((result) => {
                result.quantity = result.quantity - product.quantity;
                result
                  .save()
                  .then((savedProduct) => {
                    console.log('product updated');
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(403).json({ message: 'product not saved', err });
                  });
              })
              .catch((err) => {
                console.log(err);
                res.status(403).json({ message: 'product not found', err });
              });
          });

          Cart.findOne({ idUser: idUser })
            .then((result) => {
              result.lproduct = [];
              result
                .save()
                .then((savedCart) => {
                  res.status(201).json({
                    success: true,
                    message: 'Order saved sucessfully',
                    savedOrder,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(403).json({ message: 'cart not saved', err });
                });
            })
            .catch((err) => {
              console.log(err);
              res.status(403).json({ message: 'cart not found', err });
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(403).json({ message: 'order not saved', err });
        });
    } else {
      res.status(403).json({ sucess: false, error: 'token not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Error adding product to cart', error });
  }
};

// *  ==================== END ====================

//  TODO: Get Orders of the user

// *  ==================== START ====================

const getClientOrders = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      let cleanedToken = token.replace('Bearer ', '');

      const decoded = jwt.decode(cleanedToken, process.env.JWT_SECRET);

      const idUser = decoded.data.id;
      // console.log(idUser);

      Order.find({ idUser: idUser })
        .then((result) => {
          res.status(201).json({ success: true, orders: result });
        })
        .catch((err) => {
          console.log(err);
          res.status(403).json({ message: 'order not found', err });
        });
    } else {
      res.status(403).json({ sucess: false, error: 'token not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Error adding product to cart', error });
  }
};

// *  ==================== END ====================

// Get All Orders

// *  ==================== START ====================
const getAllOrders = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      let cleanedToken = token.replace('Bearer ', '');

      const decoded = jwt.decode(cleanedToken, process.env.JWT_SECRET);
      const idUser = decoded.data.id;
      const role = decoded.data.role;
      // console.log(idUser);

      if (role === 'admin') {
        Order.find()
          .then((result) => {
            res.status(201).json({ success: true, orders: result });
          })
          .catch((err) => {
            console.log(err);
            res.status(403).json({ message: 'order not found', err });
          });
      } else {
        res.status(403).json({ message: 'You are not admin' });
      }
    } else {
      res.status(403).json({ sucess: false, error: 'token not found' });
    }
  } catch (error) {
    console.log(error);

    res.status(403).json({ message: 'Error adding product to cart', error });
  }
};

// *  ==================== END ====================

// Cancel Order by client

// *  ==================== START ====================
const cancelOrder = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      let cleanedToken = token.replace('Bearer ', '');

      const decoded = jwt.decode(cleanedToken, process.env.JWT_SECRET);
      const idUser = decoded.data.id;
      const { idOrder } = req.body;
      // console.log(idUser);

      Order.findOne({ _id: idOrder })
        .then((result) => {
          if (result.idUser == idUser) {
            // update the quantity of the product in the stock

            result.productsList.map((product) => {
              Product.findById(product.idProduct)
                .then((result) => {
                  result.quantity = result.quantity + product.quantity;
                  result
                    .save()
                    .then((savedProduct) => {
                      console.log('product updated');
                    })
                    .catch((err) => {
                      console.log(err);
                      res
                        .status(403)
                        .json({ message: 'product not saved', err });
                    });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(403).json({ message: 'product not found', err });
                });
            });

            // check if the order is pending
            if (result.status === 'pending') {
              result.status = 'canceled';
              result
                .save()
                .then((savedOrder) => {
                  res
                    .status(201)
                    .json({
                      success: true,
                      message: 'Order canceled',
                      order: savedOrder,
                    });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(403).json({ message: 'order not saved', err });
                });
            } else {
              res.status(403).json({ message: 'Order is not pending' });
            }
          } else {
            res
              .status(403)
              .json({ message: 'You are not the owner of this order' });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(403).json({ message: 'order not found', err });
        });
    } else {
      res.status(403).json({ sucess: false, error: 'token not found' });
    }
  } catch (error) {
    console.log(error);

    res.status(403).json({ message: 'Error adding product to cart', error });
  }
};

// *  ==================== END ====================

// Update Order Status by admin

// *  ==================== START ====================
const updateOrderStatus = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      let cleanedToken = token.replace('Bearer ', '');

      const decoded = jwt.decode(cleanedToken, process.env.JWT_SECRET);
      const idUser = decoded.data.id;
      const role = decoded.data.role;
      const { idOrder, status } = req.body;
      // console.log(idUser);

      if (role === 'admin') {
        Order.findOne({ _id: idOrder })
          .then((result) => {
            if (result) {
              result.status = status;
              result
                .save()
                .then((savedOrder) => {
                  res
                    .status(201)
                    .json({
                      success: true,
                      message: 'Order status updated',
                      savedOrder,
                    });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(403).json({ message: 'order not saved', err });
                });
            } else {
              res.status(403).json({ message: 'Order not found' });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(403).json({ message: 'order not found', err });
          });
      } else {
        res.status(403).json({ message: 'You are not admin' });
      }
    } else {
      res.status(403).json({ sucess: false, error: 'token not found' });
    }
  } catch (error) {
    console.log(error);

    res.status(403).json({ message: 'Error adding product to cart', error });
  }
};

// *  ==================== END ====================

// Get Ordeer by id by the client

// *  ==================== START ====================

const getOrderById = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      let cleanedToken = token.replace('Bearer ', '');

      const decoded = jwt.decode(cleanedToken, process.env.JWT_SECRET);
      const idUser = decoded.data.id;
      const { idOrder } = req.body;
      // console.log(idUser);

      Order.findOne({ _id: idOrder })
        .then((result) => {
          if (result.idUser == idUser) {
            res
              .status(201)
              .json({ success: true, message: 'Order found', orders: result });
          } else {
            res
              .status(403)
              .json({ message: 'You are not the owner of this order' });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(403).json({ message: 'order not found', err });
        });
    } else {
      res.status(403).json({ sucess: false, error: 'token not found' });
    }
  } catch (error) {
    console.log(error);

    res.status(403).json({ message: 'Error adding product to cart', error });
  }
};

// *  ==================== END ====================

// Get last 5 orders by client id

// *  ==================== START ====================

const lastFiveOrders = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      let cleanedToken = token.replace('Bearer ', '');

      const decoded = jwt.decode(cleanedToken, process.env.JWT_SECRET);
      const idUser = decoded.data.id;
      // console.log(idUser);

      Order.find({ idUser: idUser })
        .sort({ createdAt: -1 })
        .limit(5)
        .then((result) => {
          res
            .status(201)
            .json({ success: true, message: 'Order found', orders: result });
        })
        .catch((err) => {
          console.log(err);
          res.status(403).json({ message: 'order not found', err });
        });
    } else {
      res.status(403).json({ sucess: false, error: 'token not found' });
    }
  } catch (error) {
    console.log(error);

    res.status(403).json({ message: 'Error adding product to cart', error });
  }
};

// TODO: get Cart

// *  ==================== START ====================
const getcart = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      let cleanedToken = token.replace('Bearer ', '');

      const decoded = jwt.decode(cleanedToken, process.env.JWT_SECRET);
      const idUser = decoded.data.id;
      // console.log(idUser);

      const cart = await productService.getCartfunction(idUser);
      res.status(201).json({ success: true, cart: cart });
    } else {
      res.status(403).json({ sucess: false, error: 'token not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'cart does not exist' });
  }
};

// *  ==================== END ====================
// TODO: delete from Cart

// *  ==================== START ====================

const deletefromcart = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      let cleanedToken = token.replace('Bearer ', '');

      const decoded = jwt.decode(cleanedToken, process.env.JWT_SECRET);
      const idUser = decoded.data.id;
      const idproduct = req.params.id;

      Cart.findOne({ idUser: idUser })
        .then((result) => {
          // return console.log(result);
          const exist = result.lproduct.find(
            (x) => x.idproduct.toString() === idproduct
          );
          //  console.log('exist    ',exist);
          if (exist) {
            const indexElm = result.lproduct.indexOf(exist);
            result.lproduct.splice(indexElm, 1);
            result
              .save()
              .then((savedcart) => {
                res.status(201).json({
                  success: true,
                  message: 'product removed sucessfully',
                  savedcart,
                });
              })
              .catch((err) => {
                console.log(err);
                res
                  .status(403)
                  .json({ sucess: false, error: 'cart not saved' });
              });
          } else {
            res.status(403).json({ sucess: false, error: 'cart empty' });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(403).json({ sucess: false, error: 'cart not found' });
        });
    } else {
      res.status(403).json({ sucess: false, error: 'token not found' });
    }
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .json({ message: 'Error removing product from cart', error });
  }
};

// *  ==================== END ====================
// TODO: update quantity in Cart

// *  ==================== START ====================

const updateQtCart = async (req, res) => {
  try {
    const { idCart, idproduct, quantity } = req.body;
    const product = await productService.findProductByIdFunction(idproduct);
    if (product.quantity >= quantity) {
      await productService.updateQtCartfunction(idCart, idproduct, quantity);
      res
        .status(200)
        .json({ message: 'Product quantity updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating product quantity', error });
  }
};

// *  ==================== END ====================
// TODO: delete the Cart

// *  ==================== START ====================

const deleteCart = async (req, res) => {
  try {
    const { idUser } = req.body;
    await productService.deleteCartfunction(idUser);
    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cart', error });
  }
};
// *  ==================== END ====================
// TODO: Add To Wishlist

// *  ==================== START ====================

const addtoWishlist = async (req, res) => {
  try {
    const { idUser, idproduct } = req.body;
    await productService.addtoWishlistfunction(idUser, idproduct);
    res.status(200).json({ message: 'Product added to Wishlist successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error adding product to Wishlist', error });
  }
};

// *  ==================== END ====================
// TODO: delete from Wishlist

// *  ==================== START ====================

const deletefromWishlist = async (req, res) => {
  try {
    const { idUser, idproduct } = req.body;
    await productService.deletefromWishlistfunction(idUser, idproduct);
    res
      .status(200)
      .json({ message: 'Product removed from wishlist successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error removing product from wishlist', error });
  }
};

// *  ==================== END ====================
// TODO: delete the Wishlist

// *  ==================== START ====================

const deleteWislist = async (req, res) => {
  try {
    const { idUser } = req.body;
    await productService.deleteWishlistfunction(idUser);
    res.status(200).json({ message: 'Wishlist deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Wishlist', error });
  }
};
// *  ==================== END ====================
// TODO: add order

// *  ==================== START ====================

// const addorder = async (req, res) => {
//     try {
//         const sum=0
//         const cart= await getcart(req.body.idUser)

//          cart.lproduct.forEach(async product => {

//             const pr= await productService.findProductByIdFunction(product.idproduct)
//            pr.quantity=pr.quantity-product.quantity
//            await productService.updatProductFunction({ _id: pr._id }, pr)
//             sum= sum+(product.quantity*pr.price)
//           });
//         const newOrder = await productService.AddOrderfunction(req.body.idUser, cart.idCart, req.body.statue,sum);

//         res.json({
//             message: 'Order created successfully',
//             data: newOrder
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error creating Order',
//             error: error.message
//         });
//     }
// };
// *  ==================== END ====================

// TODO: get order

// *  ==================== START ====================
// const getOrder = async (req, res) => {
//     try {
//       const orders = await productService.getOrderfunction();
//       res.status(200).json(orders);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   };
// *  ==================== END ====================
// TODO: get user order

// *  ==================== START ====================
// const getUserOrder = async (req, res) => {
//     try {
//       const orders = await productService.getOrderUserfunction(req.params.id);
//       res.status(200).json(orders);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   };
// *  ==================== END ====================
// TODO: update order

// *  ==================== START ====================
// const updateOrder = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const statue = req.body.statue;
//         const updatedOrder = await updateStatue(id, statue);
//         res.status(200).json({
//             message: 'Order statue updated successfully',
//             data: updatedOrder
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error updating order statue',
//             error: error.message
//         });
//     }
// };
// *  ==================== END ====================

// TODO: get invoice

// *  ==================== START ====================
const getInvoice = async (req, res) => {
  try {
    const invoices = await productService.getinvoicefunction();
    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// *  ==================== END ====================
// TODO: get user invoice

// *  ==================== START ====================
const getUserInvoice = async (req, res) => {
  try {
    const order = await productService.getUserinvoicefunction(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// *  ==================== END ====================

// TODO: get product number by category

// *  ==================== START ====================
// const getNmbrProductByCatg = async (id,res) => {
//   try {
//     const categopry = await Category.findById(id);
//     if (!categopry) {
//       return res.status(403).message({ message: 'category not found' });
//     }

//     const products = await Product.countDocuments({
//       categoryId: id,
//     });
//     if (products === 0) {
//       console.log('Products List is empty');
//       res.status(201).json({
//         success: true,
//         message: 'Products List is empty',
//         nmrByCatg: 0,
//       });
//     } else {
//       res.status(201).json({
//         success: true,
//         message: 'Products number',
//         nmrByCatg: products,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An Eror has Occured' });
//   }
// };
// *  ==================== END ====================

// TODO: get product number by brand

// *  ==================== START ====================
// const getNmbrProductByBrand = async (req, res) => {
//   try {
//     const brand = await Brand.findById(req.params.id);
//     if (!brand) {
//       return res.status(403).message({ message: 'brand not found' });
//     }

//     const products = await Product.countDocuments({ brandId: req.params.id });
//     if (products === 0) {
//       console.log('Products List is empty');
//       res.status(201).json({
//         success: true,
//         message: 'Products List is empty',
//         nmrByBrand: 0,
//       });
//     } else {
//       res.status(201).json({
//         success: true,
//         message: 'Products number',
//         nmrByBrand: products,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An Eror has Occured' });
//   }
// };
// *  ==================== END ====================

// TODO: toip 5 products

// *  ==================== START ====================

module.exports = {
  getProducts,
  findProductById,
  saveProduct,
  updatProduct,
  deleteProduct,
  getproductByCatg,
  getproductByBrand,
  addtocart,
  deletefromcart,
  updateQtCart,
  deleteCart,
  addtoWishlist,
  deletefromWishlist,
  deleteWislist,
  // addorder,
  // getOrder,
  // updateOrder,
  // getUserOrder,
  getInvoice,
  getUserInvoice,
  // getNmbrProductByCatg,
  // getNmbrProductByBrand,
  getcart,
  updateCart,
  createOrder,
  updateOrderStatus,
  getClientOrders,
  getAllOrders,
  cancelOrder,
  getOrderById,
  lastFiveOrders,
};
