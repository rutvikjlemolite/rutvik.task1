import express from "express";
import UserController from "../controller/userController.js";
import CartController from "../controller/cartController.js";

const route = express.Router();

route.post("/signup",UserController.signUp);
route.post("/login",UserController.login);
route.get("/getallusers",UserController.getUsers);
route.get("/getoneuser/:id",UserController.getOneUser)
route.get("/getadmin",UserController.getAdminUsers);
route.post("/createproduct",UserController.createProduct);
route.get("/getproduct",UserController.getProduct);
route.delete("/deleteuser/:id",UserController.deleteUser);
route.delete("/deleteproduct/:id",UserController.deleteproduct);
route.put("/updateproduct/:id",UserController.updateProduct);
route.get("/getoneproduct/:id",UserController.getOneProduct);

route.post("/addtocart",CartController.addToCart)
route.get("/getfromcart/:id",CartController.getFromCart)
route.delete("/removefromcart/:id",CartController.deleteCartItems)


export default route;