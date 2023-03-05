const User = require('../models/user');
const bcrypt = require('bcrypt');

//TODO: Add user
// *  ==================== START ====================
const addUser = async (data) => {
     console.log(data);
    // ? check if the email already exists?
  
    const isExist = await User.findOne({
        email: data.email,
    });
  
    if (isExist && isExist.email === data.email) {
      return { success: false, status: 403, message: 'Email already exists' };
    }
  
    // TODO: generate a hashed password
    const hashedpassword = await bcrypt.hash(data.password, 10);
  
    data.password = hashedpassword;
  
    //TODO: Create user
    let user = await User.create(data);
   
    return { success: true, status: 201, message: 'User created', user };
};
// *  ==================== END ====================

// TODO: get All Users

// *  ==================== START ====================
const getUsersFunction = async(role) => {
    try {
        const users = await User.find({role:role})
        return users;
    } catch (error) {
        console.log(error);
        return error;
    }
}
// *  ==================== END ====================



// TODO: Update User

// *  ==================== START ====================

const updatUserFunction = async(id,data) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: id },data,{ new: true });
        return updatedUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// *  ==================== END ====================


// TODO: Delete User

// *  ==================== START ====================

const deleteUserFunction = async(id) => {
    try {
        const deletedUser = await User.deleteOne(id)
        return deletedUser;

    } catch (error) {
        console.log(error);
        return error;
    }
}

// *  ==================== END ====================


// TODO: GetNumbers Of Users Function

// *  ==================== START ====================

const getnumbUsfunction = async () => {
    try {
   const us =await User.findOne();
   us.forEach(async user => {
    number.push(user._id)
   })
   return number.lenght()
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

// *  ==================== END ====================

module.exports = {
    addUser,
    getUsersFunction,
    updatUserFunction,
    deleteUserFunction,
    getnumbUsfunction,
};