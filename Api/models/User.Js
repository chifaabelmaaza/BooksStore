const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
       
    },
    email:{
        type: String,
        required: true,
        unique: true,
       
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: false,
        default: 'user',
    },
    adress:{
        type: String,
        required: false,
    },
    phone:{
        type: String,
        required: false,
    },
   

   


    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
});
module.exports = mongoose.model('User', UsersSchema);