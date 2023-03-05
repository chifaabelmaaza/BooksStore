const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    idUser : {
       
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
   
    lproduct: [
        { idproduct:  {
       
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }, 
      }
        
      ],

   
});
module.exports = mongoose.model('Wishlist', WishlistSchema);