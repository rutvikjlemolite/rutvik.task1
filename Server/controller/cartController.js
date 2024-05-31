import Cart from "../model/cartModel.js";
import Product from "../model/productModel.js";
import User from "../model/userModel.js";


class CartController {
    
    static addToCart = async (req, res) => {

        try {
          const { userId, productId, quantity } = req.body;
      
      
          const userExists = await User.findById(userId);
          if (!userExists) {
            //   console.log("User not found");
            return res.status(404).json({ message: "User not found" });
          }
      
          const productExists = await Product.findById(productId);
          if (!productExists) {
            //   console.log("Product not found");
            return res.status(404).json({ message: "Product not found" });
          }
      
          // Check if the cart item already exists
          const existingCartItem = await Cart.findOne({
            user: userId,
            product: productId,
          });
      
          if (existingCartItem) {
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            // console.log("Product quantity updated in cart");
            return res
              .status(200)
              .json({ message: "Product quantity updated in cart" });
          }
      
          // If the product is not in the cart, create a new cart item
          const newCartItem = new Cart({
            user: userId,
            product: productId,
            quantity,
          });
      
          const response = await newCartItem.save();
      
          // console.log("Product added to cart:", response);
      
          return res.status(201).json({ message: "Product added to cart" });
        } catch (error) {
          // console.log("Server Error:", error);
          return res.status(500).json({ message: "Server Error" });
        }
      };

      static getFromCart = async(req,res,next) => {

        const userId = req.params.id;

        // console.log(userId)

        try {

          const cart = await Cart.find({user:userId}).populate('product')

        //  console.log(cart)
         
          return res.json(cart);

        } catch (error) {
          next(error);
        }
      } 

     
      static deleteCartItems = async(req,res,next) => {
       
        try {
          const id = req.params.id;
          const item = await Cart.findById(id);
    
          if(item){
            await Cart.findByIdAndDelete(id);
          return res.json({
            msg: "items deleted successfully",
            status: true,
          });
          }
          else{
            return res.json({ msg:"items not found", status: false });
          }
          
        } catch (error) {
          next(error);
        }
      }
     
      
      
    
  }
  
  export default CartController;




