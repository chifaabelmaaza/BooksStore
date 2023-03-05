const Product = require("../models/Product");
const Category = require("../models/Category");
const Brand = require("../models/Brand");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Wishlist = require("../models/Wishlist");
const Invoice = require("../models/Invoice");

// TODO: Get Products List

// *  ==================== START ====================
const getProductsFunction = async () => {
  try {
    const products = await Product.find()
      // .select("image price quantity name description")
      .populate("categoryId", "name")
      .populate("brandId", "name");
    // console.log(products)
    return products;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// *  ==================== END ====================

// TODO: get Product By Id

// *  ==================== START ====================
const findProductByIdFunction = async (id) => {
  try {
    const findProduct = await Product.findById(id)
      .populate("categoryId")
      .populate("brandId");
    return findProduct;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// *  ==================== END ====================

// TODO: Add Product

// *  ==================== START ====================

const saveProductFunction = async (data) => {
  try {
    const savedproduct = await Product.create(data);
    return savedproduct;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// *  ==================== END ====================

// TODO: Update Product
// *  ==================== START ====================

const updatProductFunction = async (id, data) => {
  try {
    const updatedproduct2 = await Product.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return updatedproduct2;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// *  ==================== END ====================

// TODO: Delete Product

// *  ==================== START ====================

const deleteProductFunction = async (id) => {
  try {
    const deletedproduct = await Product.deleteOne(id);
    return deletedproduct;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// *  ==================== END ====================

/* TODO: Filters */

// TODO: get Product By Category

// *  ==================== START ====================

const getproductByCatgFunction = async (res, id) => {
  try {
    const categopry = await Category.findById(id);
    if (!categopry) {
      return res.status(403).message({ message: "category not found" });
    }

    const products = await Product.find({ categoryId: id });
    // console.log(products)
    if (!products) {
      console.log("Products List is empty");
      return error;
    } else {
      return products;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

// *  ==================== END ====================


// TODO: get Product By Brand

// *  ==================== START ====================

const getproductByBrandFunction = async (res, id) => {
  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(403).message({ message: "brand not found" });
    }

    const products = await Product.find({ brandId :id });
    if (!products) {
      console.log("Products List is empty");
      return error;
    } else {
      return products;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

// *  ==================== END ====================



// TODO: get Cart

// *  ==================== START ====================

const getCartfunction = async (idUser) => {
  try {
    const cart = await Cart.findOne({ idUser : idUser })
                          .populate("lproduct.idproduct", "name price image brandId categoryId");
    if (!cart) {
      throw new Error("No cart found for that user");
    }
    return cart;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// *  ==================== END ====================


// TODO: update quantity of the product in the  Cart

// *  ==================== START ====================

const updateQtCartfunction = async (idUser, idproduct, quantity) => {
  try {
    const cart = await Cart.findOne({ idUser : idUser });
    if (!cart) {
      throw new Error("Cart not found");
    } else {
      const productIndex = cart.lproduct.findIndex(
        (p) => p.idproduct.toString() === idproduct
      );
      if (productIndex === -1) {
        throw new Error("Product not found in cart");
      }
      cart.lproduct[productIndex].quantity = quantity;
      await cart.save();
    }
  } catch (error) {
    console.log(error);
  }
};

// *  ==================== END ====================
// TODO: Delete The Cart

// *  ==================== START ====================

const deleteCartfunction = async (idUser) => {
  try {
    await Cart.findOneAndDelete({ idUser : idUser });
  } catch (error) {
    console.log(error);
  }
};

// *  ==================== END ====================

// TODO: Delete Wishlist

// *  ==================== START ====================

const deleteWishlistfunction = async (idUser) => {
  try {
    await Wishlist.findOneAndDelete({ idUser });
  } catch (error) {
    console.log(error);
  }
};

// *  ==================== END ====================
// TODO: Add an order

// *  ==================== START ====================

const AddOrderfunction = async (idUser, idCart, statue, value) => {
  const newOrder = new Order({
    idUser,
    idCart,
    statue,
    value,
  });
  await newOrder.save();
  return newOrder;
};

// *  ==================== END ====================

// TODO: get order

// *  ==================== START ====================

const getOrderfunction = async () => {
  try {
    const orders = await Order.find({});
    return orders;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// *  ==================== END ====================
// TODO: get user order

// *  ==================== START ====================
const getOrderUserfunction = async (idUser) => {
  try {
    const orders = await Order.findOne({idUser : idUser});
    return orders;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// *  ==================== END ====================
// TODO: get  order by statu

// *  ==================== START ====================
const getOrderstatufunction = async (statue) => {
  try {
    const lorder = await Order.find();
    ord.forEach(async (order) => {
      if (order.statue === statue) {
        lorder.push(order);
      }
    });

    return lorder;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// *  ==================== END ====================
// TODO: update statue in order

// *  ==================== START ====================
const updateStatuefunction = async (id, statue) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: { statue } },
      { new: true }
    );
    if (statue === "Delivered") {
      idu = updatedOrder.idUser;
      const cart = await Cart.findOne({ idUser : idu });
      cart.lproduct.forEach(async (product) => {
        const pr = await Product.findById({_id : product.idproduct});
        pr.sales = pr.sales + 1;
        await Product.findOneAndUpdate({ _id: product.idproduct }, pr, {
          new: true,
        });
      });

      const newInvoice = new Invoice({
        idUser: updatedOrder.idUser,
        idOrder: updatedOrder._id,
      });
      await deleteCartfunction(idu);

      // Save the new invoice to the database
      newInvoice
        .save()
        .then((invoice) => {
          console.log("Invoice added successfully: ", invoice);
        })
        .catch((err) => {
          console.log("Error adding invoice: ", err);
        });
    }

    return updatedOrder;
  } catch (error) {
    throw new Error(error);
  }
};
// *  ==================== END ====================

// TODO: get invoices

// *  ==================== START ====================

const getinvoicefunction = async () => {
  try {
    const invoices = await Invoice.find();
    return invoices;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// *  ==================== END ====================
// TODO: get user invoices

// *  ==================== START ====================

const getUserinvoicefunction = async (idUser) => {
  try {
    const invoice = await Invoice.findOne({idUser : idUser});
    return invoice;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// *  ==================== END ====================
// TODO: get number of products

// *  ==================== START ====================
const getnumbprfunction = async () => {
  try {
    const pr = await getProductsFunction();
    pr.forEach(async (product) => {
      number.push(product._id);
    });
    return number.lenght();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// *  ==================== END ====================
// TODO: get number of brands

// *  ==================== START ====================
const getnumbbrfunction = async () => {
  try {
    const br = await Brand.find();
    br.forEach(async (brand) => {
      number.push(brand._id);
    });
    return number.lenght();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// *  ==================== END ====================

// TODO: top 5 products in sales
// *  ==================== START ====================
const getTopFiveSProducts = async () => {
  return await Product.find().sort({ sales: -1 }).limit(5);
};
// *  ==================== END ====================

// TODO: top 5 products in likes
// *  ==================== START ====================
const getTopFiveLProducts = async () => {
  return await Product.find().sort({ likes: -1 }).limit(5);
};
// *  ==================== END ====================

// TODO: get sales
// *  ==================== START ====================
const getSales = async () => {
  const orders = await Order.find()
  const totalS= 0
  orders.forEach(async order=>{
      totalS= totalS+order.value
    })
  return totalS;
}
// *  ==================== END ====================

module.exports = {
  getProductsFunction,
  findProductByIdFunction,
  saveProductFunction,
  updatProductFunction,
  deleteProductFunction,
  getproductByCatgFunction,
  getproductByBrandFunction,
  getCartfunction,
  updateQtCartfunction,
  deleteCartfunction,
  deleteWishlistfunction,
  AddOrderfunction,
  getOrderfunction,
  updateStatuefunction,
  getinvoicefunction,
  getOrderUserfunction,
  getUserinvoicefunction,
  getnumbprfunction,
  getnumbbrfunction,
  getOrderstatufunction,
  getTopFiveSProducts,
  getTopFiveLProducts,
  getSales
  
};
