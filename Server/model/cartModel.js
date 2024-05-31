import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema({
   

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,

      },

      product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },
    
  
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
