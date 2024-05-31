import Product from "../model/productModel.js";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";

class UserController {
  static signUp = async (req, res, next) => {
    try {
      const { username, email, password, role, confirm_password } = req.body;

      if (username && email && password && role && confirm_password) {
        const usernamecheck = await User.findOne({ username });
        if (usernamecheck) {
          return res.json({ msg: "Username already used", status: false });
        }

        // const roleCheck = await User.findOne({role})
        // if (roleCheck) {
        //   return res.json({ msg: "Email already used", status: false });
        // }

        const emailcheck = await User.findOne({ email });
        if (emailcheck) {
          return res.json({ msg: "Email already used", status: false });
        }

        const hashpassword = await bcrypt.hash(password, 10);
        const hashpassword1 = await bcrypt.hash(confirm_password, 10);

        const user = await User.create({
          email,
          username,
          password: hashpassword,
          role,
          confirm_password: hashpassword1,
        });

        delete user.password;
        return res.json({
          msg: "User created successfully",
          status: true,
          user,
        });
      } else {
        return res.json({ msg: "Please fill all the field", status: false });
      }
    } catch (error) {
      next(error);
    }
  };

  // PENDING FOR ROLE BASED ACCESS

  static login = async (req, res, next) => {
    try {
      const { username, password ,role} = req.body;

      const user = await User.findOne({ username });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
           
          return res.json({ msg: "Login successful", status: true, user } );
           
        } else {
          return res.json({
            msg: "Login Failed !! please check credentials",
            status: false,
          });
        }
      } else {
        return res.json({ msg: "You are not register user", status: false });
      }
    } catch (error) {
      next(error);
    }
  };

  static getOneUser = async(req,res,next) => {

    try {
      const id = req.params.id;
      const userExist = await User.findById(id);
      if (!userExist) {
        return res.status(404).json({ msg: "user not found" });
      }
  
      res.status(200).json(userExist);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  
  }

  static deleteUser = async(req,res,next) => {
       
    try {
      const id = req.params.id;
      const user = await User.findById(id);

      if(user){
        await User.findByIdAndDelete(id);
      return res.json({
        msg: "user deleted successfully",
        status: true,
      });
      }
      else{
        return res.json({ msg: "User not found", status: false });
      }
      
    } catch (error) {
      next(error);
    }
  }

  static getUsers = async (req, res, next) => {
    try {
      const users = await User.find({ role: { $ne: "admin" } }).select([
        "username",
        "email",
        "role",
        "_id",
      ]);

      return res.json(users);
    } catch (error) {
      next(error);
    }
  };

  static getAdminUsers = async (req, res, next) => {
    try {
      // Fetch users with the role "admin"
      const adminUsers = await User.find({ role: "admin" }).select([
        "username",
        "email",
        "role",
        "_id",
      ]);

      return res.json(adminUsers);
    } catch (error) {
      next(error);
    }
  };

  
  static createProduct = async (req, res, next) => {
    try {
      const { productname, price, category, stock } = req.body;
  
      if (!productname || !price || !category || !stock) {
        return res.json({ msg: "Fill all required fields", status: false });
      }
  
      const productCheck = await Product.findOne({ productname });
  
      if (productCheck) {
        return res.json({ msg: "Product has already been listed", status: false });
      }
  
      if (price <= 0 || stock < 0) {
        return res.json({ msg: "Enter valid values for price and stock", status: false });
      }
  
      const product = await Product.create({
        productname,
        price,
        category,
        stock,
      });
  
      return res.json({
        msg: "Product listed successfully",
        status: true,
        product,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      next(error);
    }
  };

  static getOneProduct = async(req,res,next) => {
    try {
      const id = req.params.id;
      const productExist = await Product.findById(id);
      if (!productExist) {
        return res.status(404).json({ msg: "Product not found" });
      }
  
      res.status(200).json(productExist);
      
    } catch (error) {
      next(error);
    }
  
  }


  static getProduct = async(req,res,next) => {

    try {
      const product = await Product.find(req.params.id).select([
        "productname",
        "price",
        "category",
        "stock"
    
      ])
  
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  

  static deleteproduct = async(req,res,next) => {
       
    try {
      const id = req.params.id;
      const product = await Product.findById(id);

      if(product){
        await Product.findByIdAndDelete(id);
      return res.json({
        msg: "Product deleted successfully",
        status: true,
      });
      }
      else{
        return res.json({ msg:"Product not found", status: false });
      }
      
    } catch (error) {
      next(error);
    }
  }


  static updateProduct = async(req , res , next) => {
    
    try {
      const id = req.params.id;
      const product = await Product.findById(id);
      if (!product) {
        return res.json({ msg:"Product not found", status: false });

      }
  
      const updatedData = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.json({
        msg: "Product Updated successfully",
        status: true,
        updatedData
      });
    } catch (error) {
      next(error);
    }

  }
  
}

export default UserController;
