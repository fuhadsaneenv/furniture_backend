import asyncHandler from "../middleware/asyncHandler.js";
import { STATUS } from "../utils/constants.js";
import { addProductToWishlist,removeWishlistService,getAllWishlistService } from "../service/wishlistService.js";


//addwishlist

export const addToWishlist=asyncHandler(async(req,res)=>{
  const {id}=req.params
  const userId=req.user.id

  const wishlistProduct=await addProductToWishlist(id,userId)
  if(wishlistProduct)
     res.status(200).json({
    status:STATUS.SUCCESS,
    message:"product added to whishlist sucessfully"
    })
})

//remove wishlist

export const removeSingleWishlist=asyncHandler(async(req,res)=>{
  const userId=req.user._id
  const {id}=req.params
  await removeWishlistService(userId,id)
  res.json({
    status:STATUS.SUCCESS,
    message:"product removed from fevourites successfully"
  })
})


//get all whishlist

export const getAllWishlist=asyncHandler(async(req,res)=>{
  const userId=req.user._id
  const userWishlist=await getAllWishlistService(userId)
  if(!userWishlist||userWishlist.wishlist.length===0){
    res.status(200).json({
      status:STATUS.SUCCESS,
      message:"wishlist is empty"
    })
  }
  else 
  res.status(200).json({
status:STATUS.SUCCESS,
wishlist:userWishlist.wishlist

  })
})

// 1️⃣ addToWishlist (Add Product to Wishlist)
// ✅ English:

// Extracts id (product ID) from req.params.

// Extracts userId from req.user.

// Calls addProductToWishlist(id, userId) to add the product to the wishlist.

// If successful, returns a success response (Product added to wishlist successfully).

// ✅ Manglish:

// Request params ninnu product id edukkum.

// req.user ninnu userId edukkum.

// addProductToWishlist(id, userId) call cheyyum product wishlist il add cheyyan.

// Success aayal response kodukkum (Product added to wishlist successfully).

// 2️⃣ removeSingleWishlist (Remove Product from Wishlist)
// ✅ English:

// Extracts userId from req.user._id.

// Extracts id (product ID) from req.params.

// Calls removeWishlistService(userId, id) to remove the product.

// Returns success response (Product removed from favorites successfully).

// ✅ Manglish:

// req.user._id ninnu userId edukkum.

// Request params ninnu id (product ID) edukkum.

// removeWishlistService(userId, id) call cheyyum product remove cheyyan.

// Success response kodukkum (Product removed from favorites successfully).

// 3️⃣ getAllWishlist (Get All Wishlist Items)
// ✅ English:

// Extracts userId from req.user._id.

// Calls getAllWishlistService(userId) to fetch wishlist products.

// If wishlist is empty, returns (Wishlist is empty).

// Otherwise, returns all wishlist items.

// ✅ Manglish:

// req.user._id ninnu userId edukkum.

// getAllWishlistService(userId) call cheyyum wishlist products fetch cheyyan.

// Wishlist empty aayenkil (Wishlist is empty) response kodukkum.

// Otherwise, ellaa wishlist items um return cheyyum.

// 🔹 Summary
// ✅ English:

// addToWishlist → Adds a product to the user's wishlist.

// removeSingleWishlist → Removes a product from the user's wishlist.

// getAllWishlist → Fetches all products in the user's wishlist.

// ✅ Manglish:

// addToWishlist → Product wishlist il add cheyyum.

// removeSingleWishlist → Wishlist ninnu product remove cheyyum.

// getAllWishlist → User de wishlist full fetch cheyyum.