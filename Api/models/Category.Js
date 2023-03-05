const mongoose = require('mongoose');

const CategoriesSchema = new  mongoose.Schema({
    name: {
        type: String,
        reauired: true,
    },
    image: {
        type: String,
        required: true,
    },
    product_number:{
        type: Number,
        default: 0,
        required: false
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
});
module.exports = mongoose.model('Category', CategoriesSchema);