const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',

    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',

    },
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: false,
    },
    sales: {
        type: Number,
        required: true,
        default: 0,
    },
    likes: {
        type: Number,
        required: true,
        default: 0,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
});
module.exports = mongoose.model('Product', productSchema);