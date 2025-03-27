import Cart from '../models/cartModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { STATUS } from '../utils/constants.js';
import { addProductToCart ,getUserCart,removeProductFromCart} from "../service/cartService.js";
import CustomError from '../utils/customError.js';
import mongoose from 'mongoose';

export const addToCart = asyncHandler(async (req, res) => {
  const { productId} = req.params;
  const userId=req.user._id             
  if (!productId) {
    return res.status(400).json({ error: '"productId" is required' });
  }
  await addProductToCart(productId, userId);
  res.json({ status: STATUS.SUCCESS, message:"Product added successfully to cart."});
});

//get all items in cart
export const getCart =asyncHandler(async (req, res) => {
    const userId=req.user._id
  const cart = await getUserCart(userId);

  if(!cart)
    res.status(200).json({status:STATUS.SUCCESS,message:"Your cart is empty"})
else 
    res.status(200).json({status:STATUS.SUCCESS,message:"cart list ....",cart})
})
  
// //delete item in cart
// export const removeFromCart =asyncHandler(async (req, res) => {
//     const {productId}=req.params
//   const userId = req.user._id;
//     await removeProductFromCart(userId, productId)
//     res.json({status:STATUS.SUCCESS,message:"delete cart success"})
// })
 

//delete item in cart



  export const removeFromCart = asyncHandler(async (req, res, next) => {                    //instead req,res,next=>async (userId, productId)
    const userId = req.user.id;                                                            
    const { productId } = req.params; 

    if (!mongoose.Types.ObjectId.isValid(productId)) {                                       // Validate if productId is a valid ObjectId
        return next(new CustomError("Invalid product ID", 400));  
    }

  const cart = await Cart.findOne({ user: userId });
  
  if (!cart)
      throw new CustomError("Cart not found", 404);

  const productIndex = cart.products.findIndex((item) => item.product.toString() === productId);

  if (productIndex === -1) {
      throw new CustomError("Product not found in the cart", 404);
  }

  const currentQuantity = cart.products[productIndex].quantity;
  if (currentQuantity > 1) {
      
      cart.products[productIndex].quantity -= 1;                 // Decrement quantity if more than 1
      await cart.save(); 
  } else {
      cart.products.splice(productIndex, 1);                    // Remove product from cart if quantity is 1
      await cart.save();
  }
  res.status(200).json({ message: "Product removed successfully", cart });
});

//increment product quantity

export const incrementProductQuantity = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id; 
  await addProductToCart(productId, userId); 
  res.json({ status: STATUS.SUCCESS, message: "Product quantity incremented successfully" });
});

// Decrement product quantity 

export const decrementProductQuantity = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id; 
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new CustomError("Cart not found", 404);
  }
  const productIndex = cart.products.findIndex((item) => item.product.toString() === productId);
  if (productIndex === -1) {
    throw new CustomError("Product not found in the cart", 404);
  }
  const currentQuantity = cart.products[productIndex].quantity;

  if (currentQuantity > 1) {
    cart.products[productIndex].quantity -= 1;                                                                   
    await cart.save(); 
    res.json({ status: STATUS.SUCCESS, message: "Product quantity decremented successfully" });
  } else {
    await removeProductFromCart(userId, productId);                                                              
    res.json({ status: STATUS.SUCCESS, message: "Product removed from cart" });
  }
});



// 1️⃣ addToCart (Add Product to Cart)
// ✅ English:

// Extracts productId from request parameters (req.params).

// Extracts userId from authentication middleware (req.user._id).

// Checks if productId is provided; if not, returns error.

// Calls addProductToCart(productId, userId) to add the product.

// Sends success response (Product added successfully to cart).

// ✅ Manglish:

// Request parameters ninnu productId edukkum (req.params).

// Authentication middleware ninnu userId edukkum (req.user._id).

// productId illenkil error kodukkum.

// addProductToCart(productId, userId) call cheyyum.

// Response il success message kodukkum (Product added successfully to cart).

// 2️⃣ getCart (Fetch All Items in Cart for a User)
// ✅ English:

// Extracts userId from authentication middleware (req.user._id).

// Calls getUserCart(userId) to fetch the user's cart.

// Checks if the cart exists:

// If empty → Responds with "Your cart is empty".

// Else → Returns cart details.

// ✅ Manglish:

// Authentication middleware ninnu userId edukkum (req.user._id).

// getUserCart(userId) call cheyyum.

// Cart empty aanel "Your cart is empty" return cheyyum.

// Cart items undenkil cart details return cheyyum.

// 3️⃣ removeFromCart (Remove a Product from Cart or Decrement Quantity)
// ✅ English:

// Extracts userId from authentication middleware (req.user._id).

// Extracts productId from request parameters (req.params).

// Checks if productId is a valid MongoDB ObjectId.

// Finds the user's cart in the database.

// Finds the product inside the cart:

// If not found → Throws "Product not found in the cart".

// If quantity > 1 → Decrements quantity by 1.

// If quantity === 1 → Removes product completely from the cart.

// Saves the updated cart and sends success response.

// ✅ Manglish:

// Authentication middleware ninnu userId edukkum (req.user._id).

// Request parameters ninnu productId edukkum (req.params).

// MongoDB ObjectId valid ano enn check cheyyum.

// Cart database il ninnu fetch cheyyum.

// Cart il product undoo enn check cheyyum:

// Product illenkil "Product not found in the cart" error throw cheyyum.

// Product quantity 1 ano check cheyyum.

// Athil kooduthal aanel -1 decrement cheyyum.

// 1 mathram aanel cart ninnu remove cheyyum.

// Cart save cheyyum & success response kodukkum.

// 4️⃣ incrementProductQuantity (Increase Product Quantity in Cart)
// ✅ English:

// Extracts productId from request parameters (req.params).

// Extracts userId from authentication middleware (req.user._id).

// Calls addProductToCart(productId, userId), which increments the quantity.

// Returns success message (Product quantity incremented successfully).

// ✅ Manglish:

// Request parameters ninnu productId edukkum (req.params).

// Authentication middleware ninnu userId edukkum (req.user._id).

// addProductToCart(productId, userId) call cheyyum.

// Success message return cheyyum (Product quantity incremented successfully).

// 5️⃣ decrementProductQuantity (Decrease Product Quantity in Cart or Remove Product)
// ✅ English:

// Extracts productId from request parameters (req.params).

// Extracts userId from authentication middleware (req.user._id).

// Finds the user's cart in the database (Cart.findOne({ user: userId })).

// Checks if the product exists in the cart:

// If not found → Throws "Product not found in the cart".

// If quantity > 1 → Decrements quantity by 1.

// If quantity === 1 → Calls removeProductFromCart(userId, productId) to remove it.

// Saves the updated cart and sends a success response.

// ✅ Manglish:

// Request parameters ninnu productId edukkum (req.params).

// Authentication middleware ninnu userId edukkum (req.user._id).

// Cart database il ninnu fetch cheyyum (Cart.findOne({ user: userId })).

// Product undoo enn check cheyyum:

// Product illenkil "Product not found in the cart" error throw cheyyum.

// Product quantity > 1 aanel -1 decrement cheyyum.

// Product quantity === 1 aanel removeProductFromCart(userId, productId) call cheyyum.

// Cart save cheyyum & success response kodukkum.

// 🔹 Summary
// ✅ English:

// addToCart → Adds a product to the user's cart.

// getCart → Fetches all items in the user's cart.

// removeFromCart → Removes a product or decreases its quantity.

// incrementProductQuantity → Increases the product quantity in the cart.

// decrementProductQuantity → Decreases product quantity or removes the product.

// ✅ Manglish:

// addToCart → User ude cart il product add cheyyum.

// getCart → Cart il ullaa ellaa products um fetch cheyyum.

// removeFromCart → Product remove cheyyum (atho quantity -1 cheyyum).

// incrementProductQuantity → Cart il product quantity kooduthal aakkum.

// decrementProductQuantity → Product quantity -1 cheyyum (1 aanel remove cheyyum).