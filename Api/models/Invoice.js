const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    idUser : {
       
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    idOrder : {
       
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
   
});
module.exports = mongoose.model('Invoice', InvoiceSchema);