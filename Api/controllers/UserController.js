const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('../models/User');
const userSercise = require('../services/userService');
const Cart = require('../models/Cart');

// TODO: Function to Create Valide Access Token :

const createAccessToken = (id, role) =>
  jwt.sign({ data: { id: id, role: role } }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// TODO: Password Validator :
const PasswordValidator =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

//TODO: register user => add user, generate token and log the user in
// *  ==================== START ====================
const register = async (req, res) => {
  // TODO: Load data frrom response body
  // console.log(req.body);

  let data = {
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    role: 'user',
  };

  if (data.password !== data.confirmPassword) {
    return res.status(403).json({
      success: false,
      message: 'password and confirm password do not match',
    });
  }

  // TODO: create the user
  try {
    userSercise
      .addUser(data)
      .then((result) => {
        // console.log(result)
        if (result.success) {
          // TODO: Generate a token and log the user in
          const token = createAccessToken(result.user._id, result.user.role);

          
          const cart = new Cart({
            idUser : result.user._id
          });
          Cart.create(cart).then(() =>{
            res.status(201).json({
              success: true,
              message: 'cart created successfully.',
              user: result.user,
              token: token,
            });
          }).catch((err) =>{
            console.log(err);
            res.status(403).json({ success: false, error:err });
          })

          // TODO: Save the token in the cookies

          // res.cookie('access_token', AccessToken, { httpOnly: true });
          // console.log(result)
          res.status(201).json({
            success: true,
            message: 'user created successfully.',
            user: result.user,
            token: token,
          });
        }
      })
      .catch((error) => {
        console.log(error); // "Promise rejected!"
        res.status(403).json({ success: false, error });
      });
  } catch (error) {
    console.log(error);
    res.status(403).json({ success: false, error });
  }
};
// *  ==================== END ====================

// TODO: Login user
// *  ==================== START ====================

const login = async (req, res) => {
  // TODO: Load data frrom response body
  let data = {
    email: req.body.email,
    password: req.body.password,
  };

  // TODO: Check email and password validation
  if (!data.email || !data.password) {
    return res
      .status(403)
      .json({ message: "S'il vous plait donner email ou mot de passe" });
  }

  // ? check if the email already exists?

  const isExist = User.findOne({
    email: data.email,
  });

  isExist
    .then(async (result) => {
      if (result && result.email) {
        // ? Check if password is correct by comparing it the password in database
        const correctPassword = await bcrypt.compare(
          data.password,
          result.password
        );
        if (!correctPassword) {
          return res.status(403).json({ error: 'Incorrect Password' });
        }
      } else {
        return res.status(403).json({ error: 'Incorrect Email' });
      }

      // TODO: Generate a token and log the user in
      const AccessToken = createAccessToken(result.id, 'user');

      // TODO: Save the token in the cookies

      // res.cookie('access_token', AccessToken, { httpOnly: true });
      res.status(201).json({
        success: true,
        message: 'user logged in successfully.',
        user: result,
        token: AccessToken,
      });
    })
    .catch((err) => {
      console.log({ error: err });
      res.status(403).send({ error: err });
    });
};
// *  ==================== END ====================

// TODO: Login admin
// *  ==================== START ====================

const loginAdmin = async (req, res) => {
  // TODO: Load data frrom response body
  let data = {
    email: req.body.email,
    password: req.body.password,
  };

  // TODO: Check email and password validation
  if (!data.email || !data.password) {
    return res
      .status(403)
      .json({ message: "S'il vous plait donner email ou mot de passe" });
  }

  // ? check if the email already exists?

  const isExist = User.findOne({
    where: {
      email: data.email,
    },
  });

  isExist
    .then(async (result) => {
      if (result && result.email) {
        // ? Check if password is correct by comparing it the password in database
        const correctPassword = await bcrypt.compare(
          data.password,
          result.password
        );
        if (!correctPassword) {
          return res.status(403).json({ error: 'Incorrect Password' });
        }
      } else {
        return res.status(403).json({ error: 'Incorrect Email' });
      }

      // TODO: Generate a token and log the user in
      const AccessToken = createAccessToken(result.id, 'admin');

      // TODO: Save the token in the cookies

      res.cookie('access_token', AccessToken, { httpOnly: true });

      res.status(201).json({
        success: true,
        message: 'user logged in successfully.',
        user: result,
        token: AccessToken,
      });
    })
    .catch((err) => {
      console.log({ error: err });
      res.status(403).send({ error: err });
    });
};
// *  ==================== END ====================

// TODO : Log out

// *  ==================== Start ====================

const logOut = async (req, res, next) => {
  // console.log(req.headers.authorization)
  const token = req.headers.authorization;
  let cleanedToken = token.replace('Bearer ', '');
  // console.log(cleanedToken);
  const decoded = jwt.decode(cleanedToken);
  decoded.logout = Date.now();
  const newToken = jwt.sign(decoded, process.env.JWT_SECRET);

  // clear the JWT from the browser's local storage
  res.clearCookie('jwt');
  return (
    res
      .status(200)
      // return a message indicating that the user has been logged out
      .json({ success: true, message: 'logged out successfully' })
  );
};

// *  ==================== END ====================

// TODO: Get loggedIn user info:

// *  ==================== START ====================

const getLoggedInUser = async (req, res) => {
  const id = req?.user;
  // console.log(req);
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    return res.status(201).json({ sucess: true, user });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ sucess: false, error: error });
  }
};

// *  ==================== END ====================

// TODO: Verifier token:

// *  ==================== START ====================

const verifieToken = async (req, res) => {
  const token = req.body.token;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    // const role = await User.findOne({
    //   where: {
    //     id: decoded?.data?.id,
    //   },
    // }).select('role');
    const role = decoded?.data?.role ? decoded?.data?.role : null;
    const exp = decoded?.exp ? decoded?.exp : null;
    // check if the token is not expired
    if (exp * 1000 < new Date().getTime()) {
      return res.status(401).json({ valid: false });
    }
    // If the token is valid, return a JSON object with valid property set to true
    return res.status(200).json({ valid: true, role });
  } catch (error) {
    // If the token is invalid, return a JSON object with valid property set to false
    return res.status(401).json({ valid: false });
  }
};

// *  ==================== END ====================

// TODO: Get Connected User:

// *  ==================== START ====================

const getConnectedUser = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      let cleanedToken = token.replace('Bearer ', '');

      const decoded = jwt.decode(cleanedToken, process.env.JWT_SECRET);
      const id = decoded.data.id
      const user = User.findOne({
          _id: id,
        
      });

      user
        .then((result) => {
          console.log(result);
          res.status(201).json({ sucess: true, user: result });
        })
        .catch((err) => {
          console.log(err);
          res.status(403).json({ sucess: false, error: err });
        });
    } else {
      res.status(403).json({ sucess: false, error: 'token not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({ sucess: false, error: err });
  }
};

// *  ==================== END ====================

// TODO: Get user by ID:

// *  ==================== START ====================

const getUserById = async (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      console.log(result);
      res.status(201).json({ sucess: true, user: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(403).json({ sucess: false, error: err });
    });
};

// *  ==================== END ====================

// TODO: Get users:

// *  ==================== START ====================

const getUsers = async (req, res) => {
  try {
    const users = await userSercise.getUsersFunction('user');
    res.status(201).json({ success: true, users: users });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Failed to get users list' });
  }
};

// *  ==================== END ====================

// TODO: Get Admin:

// *  ==================== START ====================

const getAdmins = async (req, res) => {
  try {
    const users = await userSercise.getUsersFunction('admin');
    res.status(201).json({ success: true, users: users });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Failed to get users list' });
  }
};

// *  ==================== END ====================

// TODO: Update user:

// *  ==================== START ====================

const updateUser = async (req, res) => {
  try {
    var data = {};

    if (req.body.fullname) {
      data.fullname = req.body.fullname;
    }
    if (req.body.username) {
      data.username = req.body.username;
    }
    if (req.body.email) {
      data.email = req.body.email;
    }
    data.updatedAt = new Date();

    const userdata = {
      $set: data,
    };
    const updatedUser = userSercise.updatUserFunction(
      { _id: req.params.id },
      userdata
    );
    updatedUser
      .then((result) => {
        res.status(201).json({
          success: true,
          message: 'User updated successfully',
          updatedUser,
        });
      })
      .catch((error) => {
        console.log(error)
        res
          .status(403)
          .json({ message: 'An error occurred! User  not updated' });
      });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'An error occurred! User does not exist' });
  }
};

// *  ==================== END ====================

// TODO: Update user:

// *  ==================== START ====================

const updateClient = async (req, res) => {
  try {
    var data = {};

    if (req.body.fullname) {
      data.fullname = req.body.fullname;
    }
    if (req.body.username) {
      data.username = req.body.username;
    }
    if (req.body.email) {
      data.email = req.body.email;
    }
    if (req.body.adress) {
      data.adress = req.body.adress;
    }
    if (req.body.phone) {
      data.phone = req.body.phone;
    }

    data.updatedAt = new Date();

    const userdata = {
      $set: data,
    };
    const updatedUser = userSercise.updatUserFunction(
      { _id: req.body.id },
      userdata
    );
    updatedUser
      .then((result) => {
        res.status(201).json({
          success: true,
          message: 'User updated successfully',
          updatedUser,
        });
      })
      .catch((error) => {
        console.log(error)
        res
          .status(403)
          .json({ message: 'An error occurred! User  not updated' });
      });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'An error occurred! User does not exist' });
  }
};

// *  ==================== END ====================

// TODO: Add User

// *  ==================== START ====================

const addUser = async (req, res, next) => {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(403).json({
        success: false,
        message: 'password and confirm password do not match',
      });
    }
    let data = {
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      role: 'user',
    };

    const savedUser = await userSercise.addUser(data);
    res.status(201).json({
      success: true,
      message: 'User added successfully',
      savedUser,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: 'User has not beeing added' });
  }
};

// *  ==================== END ====================

// TODO: Add Admin

// *  ==================== START ====================

const addAdmin = async (req, res, next) => {
  try {
    console.log(req.body)
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(403).json({
        success: false,
        message: 'password and confirm password do not match',
      });
    }
    let data = {
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      role: 'admin',
    };

    const savedUser = await userSercise.addUser(data);
    res.status(201).json({
      success: true,
      message: 'User added successfully',
      savedUser,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: 'User has not beeing added' });
  }
};

// *  ==================== END ====================

// TODO: Delete User

// *  ==================== START ====================

const deleteUser = async (req, res, next) => {
  try {
    const deletedBrand = await userSercise.deleteUserFunction({
      _id: req.params.id,
    });
    res.status(201).json({
      success: true,
      message: 'User deleted successfully',
      deletedBrand,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: 'User does not exist' });
  }
};

// *  ==================== END ====================

// TODO: Update Password User

// *  ==================== START ====================

const updateUserPassword = async (req, res) => {
  try {
    data = {};
    // console.log(req.body)
    const { oldPassword, password, confirmPassword } = req.body;

    const user = await User.findOne({_id: req.params.id}).then(async (user) => {

      
      // console.log(req.params.id)
      if (!user) {  
        return res.status(403).json({ message: 'user not found' });
      }
      
      if (!(await bcrypt.compare(oldPassword, user.password))) {
        return res.status(403).json({ message: 'password incorrect' });
      }
      
      if (!password || password !== confirmPassword) {
        return res.json({ message: 'Confirm password not match' });
      }
      if (!PasswordValidator.test(password)) {
        return res.json({ message: 'Password is not valid' });
      }
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      data.password = hashedPassword;
      data.updatedAt = new Date();
      
      // console.log(data)
      const updateUser = {
        $set: data,
      };
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        updateUser,
        { new: true }
        );
        res.json(updatedUser);
      });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: error });
  }
};

// *  ==================== END ====================
// TODO: Update Password User

// *  ==================== START ====================

const resetPassword = async (req, res) => {
  try {
    data = {};
    // console.log(req.body)
    

    const user = await User.findOne({_id: req.params.id});

    // console.log(req.params.id)
    if (!user) {  
      return res.status(403).json({ message: 'user not found' });
    }
    const  password = "User@123";
    if (!PasswordValidator.test(password)) {
      return res.json({ message: 'Password is not valid' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    data.password = hashedPassword;
    data.updatedAt = new Date();

    // console.log(data)
    const updateUser = {
      $set: data,
    };
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      updateUser,
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: error });
  }
};

// *  ==================== END ====================

module.exports = {
  register,
  login,
  loginAdmin,
  logOut,
  getLoggedInUser,
  getUserById,
  verifieToken,
  getConnectedUser,
  getUsers,
  updateUser,
  updateClient,
  getAdmins,
  addUser,
  addAdmin,
  deleteUser,
  updateUserPassword,
  resetPassword,
};
