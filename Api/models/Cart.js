const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  lproduct: [
    {
      idproduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});
module.exports = mongoose.model('Cart', CartSchema);
