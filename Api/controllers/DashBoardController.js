//Models
const Product = require('../models/Product');
const Cart = require('../models/Cart');
///Service
const productService = require('../services/produitService');
const userService = require('../services/userService');


// TODO: get number products

// *  ==================== START ====================
const getnbprod = async (req, res) => {
    try {
      const number = await productService.getnumbprfunction();
      res.status(200).json(number);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
// *  ==================== END ====================
// TODO: get number brands

// *  ==================== START ====================
const getnbbr = async (req, res) => {
    try {
      const number = await productService.getnumbbrfunction();
      res.status(200).json(number);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
// *  ==================== END ====================
// TODO: get number users

// *  ==================== START ====================
const getnbus = async (req, res) => {
    try {
      const number = await userService.getnumbUsfunction();
      res.status(200).json(number);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
// *  ==================== END ====================
// TODO: get number orders

// *  ==================== START ====================
const getnborderst = async (req, res) => {
    try {
      const ord = await productService.getOrderstatufunction(req.body);
      ord.forEach(async order => {
        number.push(order._id)
       })
      
      res.status(200).json(number.lenght());
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
// *  ==================== END ====================
const topFiveProductsSController = async (req, res) => {
    try {
        const topFiveProducts = await productService.getTopFiveSProducts();
        res.status(200).json({ topFiveProducts });
    } catch (error) {
        res.status(500).json({ error });
    }
};
const topFiveProductsLController = async (req, res) => {
    try {
        const topFiveProducts = await productService.getTopFiveLProducts();
        res.status(200).json({ topFiveProducts });
    } catch (error) {
        res.status(500).json({ error });
    }
};


const getTotalSale= async (req, res) => {
  try {
      const sales = await productService.getSales();
      res.status(200).json({ sales });
  } catch (error) {
      res.status(500).json({ error });
  }
};
module.exports = {
    getnbprod,
    getnbbr,
    getnbus,
    getnborderst,
    topFiveProductsSController,
    topFiveProductsLController,
    getTotalSale,
};