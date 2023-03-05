import instance from './http-common.js';
const User_URL = '/user';

async function login(data) {
  // console.log(data);
  return await instance
    .post(User_URL + `/admin-login`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function userLoggedIn(id) {
  // console.log(data);
  return await instance
    .post(User_URL + `/logged-in`, id)
    .then((res) => res)
    .catch((err) => err);
}

async function userInfo() {
  return await instance
    .get(User_URL + `/get-connected-user`)
    .then((res) => res)
    .catch((err) => err);
}

async function logout() {
  return await instance
    .get(User_URL + `/logout`)
    .then((res) => res)
    .catch((err) => err);
}

async function getUsers() {
  return await instance
    .get(User_URL + `/admins`)
    .then((res) => res)
    .catch((err) => err);
}

async function addUser(data) {
  return await instance
    .post(User_URL + `/add-admin`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function addClient(data) {
  return await instance
    .post(User_URL + `/add-user`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function getClients() {
  return await instance
    .get(User_URL + `/users`)
    .then((res) => res)
    .catch((err) => err);
}

async function getUserInfo(id) {
  return await instance
    .get(User_URL + `/user-info/${id}`)
    .then((res) => res)
    .catch((err) => err);
}

async function clientLogin(data) {
  // console.log(data);
  return await instance
    .post(User_URL + `/login`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function clientRegister(data) {
  // console.log(data);
  return await instance
    .post(User_URL + `/register`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function updateUser(data) {
  console.log(data);
  return await instance
    .put(User_URL + `/update-admin/${data.id}`, data)
    .then((res) => res)
    .catch((err) => err);
}
async function updateUserPwd(data) {
  console.log(data);
  return await instance
    .put(User_URL + `/update-admpwd/${data.id}`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function resetPassword(data) {
  // console.log(data);
  return await instance
    .put(User_URL + `/resetpwd/${data.id}`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function getCart() {
  return await instance
    .get(User_URL + `/user-cart`)
    .then((res) => res)
    .catch((err) => err);
}

async function addToCart(data) {
  return await instance
    .post(User_URL + `/add-2cart`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function removeFromCart(id) {
  return await instance
    .delete(User_URL + `/remove-frcart/${id}`)
    .then((res) => res)
    .catch((err) => err);
}

async function updateCartQty(data) {
  return await instance
    .post(User_URL + `/update-cart`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function updateInfo(data) {
  return await instance
    .put(User_URL + `/update-user`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function updatePassword(data) {
  return await instance
    .put(User_URL + `/update-userpwd/${data.id}`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function createOrder(data) {
  return await instance
    .post(User_URL + `/add-order`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function getLastOrders() {
  return await instance
    .get(User_URL + `/lastOrders`)
    .then((res) => res)
    .catch((err) => err);
}

async function cancelOrder(data) {
  return await instance
    .post(User_URL + `/order-cancel`, data)
    .then((res) => res)
    .catch((err) => err);
}

async function getOrders() {
  return await instance
    .get(User_URL + `/orders`)
    .then((res) => res)
    .catch((err) => err);
}

async function getAllOrders() {
  return await instance
    .get(User_URL + `/all-orders`)
    .then((res) => res)
    .catch((err) => err);
}

async function updateOrder(data) {
  return await instance
    .put(User_URL + `/update-order`, data)
    .then((res) => res)
    .catch((err) => err);
}


const userService = {
  login,
  userLoggedIn,
  userInfo,
  logout,
  getUsers,
  addUser,
  addClient,
  getClients,
  getUserInfo,
  clientLogin,
  clientRegister,
  updateUser,
  updateUserPwd,
  resetPassword,
  getCart,
  addToCart,
  removeFromCart,
  updateCartQty,
  updateInfo,
  updatePassword,
  createOrder,
  getLastOrders,
  cancelOrder,
  getOrders,
  getAllOrders,
  updateOrder,
};
export default userService;
