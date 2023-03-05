import instance from "./http-common.js";
const Product_URL = "/product";

async function getAllProduct() {
  return await instance
    .get(Product_URL + "/products-list")
    .then((res) => res.data)
    .catch((err) => err);
}

async function getProductById(id) {
  return await instance
    .get(Product_URL + `/product-detail/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
}


async function addProduct(data) {
  return await instance
    .post(Product_URL + `/product-add`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function updateProduct(data,id) {
  console.log(data,id)
    return await instance
      .patch(Product_URL + `/product-update/${id}`, data)
      .then((res) => res)
      .catch((err) => err);
}

async function deleteProduct(id) {
  return await instance.delete(Product_URL + `/delete-product/${id}`);
}

async function getProductsByCategory(id) {
  return await instance
    .get(Product_URL + `/product-by-category/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
}

async function getProductsByBrand(id) {
  return await instance
    .get(Product_URL + `/product-by-brand/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
}


const productService = {
  getAllProduct,
  deleteProduct,
  getProductById,
  addProduct,
  updateProduct,
  getProductsByCategory,
  getProductsByBrand,
  
};
export default productService;
