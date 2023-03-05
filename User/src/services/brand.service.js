import instance from "./http-common.js";
const Brand_URL = "/brand";
const Product_URL = "/product";

async function getAllBrands() {
  return await instance
    .get(Brand_URL + "/brands-list")
    .then((res) => res.data)
    .catch((err) => err);
}

async function getBrandById(id) {
  return await instance
    .get(Brand_URL + `/brand-detail/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
}




async function addBrand(data) {
  // console.log(data);
  return await instance
    .post(Brand_URL + `/brand-add`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function updateBrand(data,id) {
  // console.log(data);
  return await instance
    .put(Brand_URL + `/brand-update/${id}`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function deleteBrand(id) {
  return await instance.delete(Brand_URL + `/delete-brand/${id}`);
}

const brandService = {
  getAllBrands,
  deleteBrand,
  getBrandById,
  addBrand,
  updateBrand,
  
};
export default brandService;
