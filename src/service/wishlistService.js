import Wishlist from "../models/wishlistModel.js";
import CustomError from "../utils/customError.js";
import Product from "../models/productModel.js";

export const addProductToWishlist=async (productId,userId)=>{
    const existingProduct=await Product.findById(productId)
    if(!existingProduct){
        throw new CustomError("product is not available",404)
    }
    let userWishlist=await Wishlist.findOne({user:userId})
    if(!userWishlist){
        // UserActivation=new Wishlist({user:userId,wishlist:[]})
        userWishlist = new Wishlist({ user: userId, wishlist: [] });
        
    }
    const isProductInWishlist=userWishlist.wishlist.find(
        (item)=>item.toString()===productId.toString()
    )
    if(isProductInWishlist){
        throw new CustomError("product is already in the wishlist",400)
    }

    userWishlist.wishlist.push(productId)
    await userWishlist.save()
    return userWishlist    
}

export const removeWishlistService=async (userId,productId)=>{
    const updateResult=await Wishlist.updateOne(
        {user:userId},
        {$pull:{wishlist:productId}}
    );
    if(updateResult.matchedCount===0){
        throw new CustomError(" no wishlist found for the user",404)
    }
    if(updateResult.modifiedCount===0){
        throw new CustomError("product is not found in  user wishlist. ",404)
    }
}


export const getAllWishlistService=async (userId)=>{
    const userWishlist=await Wishlist.findOne({user : userId}).populate('wishlist')
    return userWishlist
};





// 1️⃣ addProductToWishlist Function
// ✅ English:

// First, the function checks if the productId exists in the Product collection. If not, it throws an error (Product is not available).

// Then, it searches for the user's wishlist. If the user does not have a wishlist, a new one is created.

// It checks if the product is already in the wishlist. If it exists, an error is thrown (Product is already in the wishlist).

// Otherwise, the product is added to the wishlist, and the updated wishlist is saved to the database.

// ✅ Manglish:

// Function muthal product id exist undo enn check cheyyum. Product illellengil error throw cheyyum (Product is not available).

// User de wishlist database il undenkil ath fetch cheyyum. Illenkil puthiya wishlist create cheyyum.

// Product already wishlist il undo enn nokum. Undenkil error throw cheyyum (Product is already in the wishlist).

// Illenkil, ath wishlist il add cheyyum, pinne database il save cheyyum.

// 2️⃣ removeWishlistService Function
// ✅ English:

// This function removes a product from a user’s wishlist using $pull in MongoDB.

// First, it searches for the user's wishlist and removes the productId from it.

// If no wishlist exists for the user, an error is thrown (No wishlist found for the user).

// If the product is not found in the wishlist, another error is thrown (Product is not found in user wishlist).

// ✅ Manglish:

// Itha user de wishlist il ninn oru product remove cheyyan vendi aanu. $pull use cheythu product remove cheyyunnu.

// Muthal user de wishlist database il undo enn nokum, pinne athil ninn productId remove cheyyum.

// User nekk wishlist illellengil error throw cheyyum (No wishlist found for the user).

// Wishlist il product illenkil error throw cheyyum (Product is not found in user wishlist).

// 3️⃣ getAllWishlistService Function
// ✅ English:

// This function retrieves a user’s wishlist.

// It searches the Wishlist collection by userId and populates it with actual product details from the Product collection.

// ✅ Manglish:

// Itha user de wishlist fetch cheyyan vendi aanu.

// Database il userId vech wishlist fetch cheyyum, pinne athil Product details attach cheyyum.

// 🔹 Summary
// ✅ English:

// addProductToWishlist → Adds a product to the user's wishlist (if it’s not already there).

// removeWishlistService → Removes a product from the user's wishlist.

// getAllWishlistService → Retrieves the user's wishlist with full product details.

// ✅ Manglish:

// addProductToWishlist → Wishlist il product add cheyyum (already illenkil).

// removeWishlistService → Wishlist il ninn oru product remove cheyyum.

// getAllWishlistService → Wishlist nekk product details okke fetch cheyyum.