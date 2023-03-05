import instance from "./http-common.js";
const Category_URL = "/category";
const Product_URL = "/product";

async function getAllCategories() {
  return await instance
    .get(Category_URL + "/categories-list")
    .then((res) => res.data)
    .catch((err) => err);
}

async function getCategoryById(id) {
  return await instance
    .get(Category_URL + `/category-detail/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
}




async function addCategory(data) {
  return await instance
    .post(Category_URL + `/category-add`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function updateCategory(data,id) {
    return await instance
      .put(Category_URL + `/category-update/${id}`, data)
      .then((res) => res)
      .catch((err) => err);
}

async function deleteCategory(id) {
  return await instance.delete(Category_URL + `/delete-category/${id}`);
}

const categoryService = {
  getAllCategories,
  deleteCategory,
  getCategoryById,
  addCategory,
  updateCategory,
  
  
};
export default categoryService;
