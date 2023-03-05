const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    idUser : {
       
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    productsList : [
        {
            idProduct : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity : {
                type: Number,
                required: true,
            },
            price : {
                type: Number,
                required: true,
            }
        }
    ],
    status: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    total:  {
        type: Number,
        default:0,
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
   
});
module.exports = mongoose.model('Order', OrderSchema);