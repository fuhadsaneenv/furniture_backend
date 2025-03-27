import product from "../models/productModel.js";
import Cart from "../models/cartModel.js"
import CustomError from "../utils/customError.js";


//add to cart

export const addProductToCart=async (productId,userId)=>{
    if(!userId){
        throw new CustomError("user authgentication failed ", 401)
    }
    const existingProduct=await product.findById(productId)
    if(!existingProduct)
        throw CustomError("product is not found",401)

    let cart =await Cart.findOne({user:userId})
    if(!cart){
        cart=new Cart({user:userId,product:[]})
        await cart.save()
    }

    const existingIndex=cart.products.findIndex((item)=>item.product.toString()===productId)
if(existingIndex> -1){
    const currentQuantity=cart.products[existingIndex].quantity;
    if(currentQuantity+1>existingProduct.quantity){
        throw new CustomError("insufficient stock. cannot add more to the cart",400)       
    }
    cart.products[existingIndex].quantity+=1
    await cart.save()
    return
}
else {
    cart.products.push({product:productId,quantity:1})
}
await cart.save()
}

export const getUserCart=async (userId)=>{
    const cart =await Cart.findOne({user:userId}).populate("products.product")
    return cart
}


export const removeProductFromCart=async(userId,productId)=>{
    const result=await Cart.updateOne(
        {user :userId},
        {$pull :{product:{product:productId}}}
    )
    if(result.modifiedCount===0){
        throw new CustomError("failed to remove the product from the cart",500)
    }
}





// 
// 
// 1️⃣ addProductToCart (Add a Product to Cart)
// ✅ English:

// Checks if userId exists; if not, throws an error (User authentication failed).

// Finds the product by productId; if not found, throws an error (Product is not found).

// Finds the user's cart using userId.

// If the cart doesn't exist, it creates a new cart for the user.

// Checks if the product is already in the cart:

// If yes, it increases the quantity by 1 but ensures stock is available.

// If adding more would exceed stock, it throws an error (Insufficient stock).

// If the product is not in the cart, it adds it with quantity: 1.

// Saves the cart with the updated products.

// ✅ Manglish:

// userId check cheyyum. Illenkil error (User authentication failed).

// Product find cheyyum (productId use cheythu). Illenkil error (Product is not found).

// User de cart find cheyyum:

// Cart illenkil puthiya cart create cheyyum.

// Product already cart il undenkil:

// Quantity increase cheyyum (max stock limit check cheyyum).

// Stock mathi illenkil error throw cheyyum (Insufficient stock).

// Product cart il illenkil, athu quantity: 1 set cheythu add cheyyum.

// Cart update cheyyum and save cheyyum.

// 2️⃣ getUserCart (Retrieve User's Cart Details)
// ✅ English:

// Finds the user's cart using userId.

// Populates product details (populate("products.product")) so that the full product information is included.

// Returns the cart.

// ✅ Manglish:

// userId use cheythu user de cart find cheyyum.

// Cart de full product details include cheyyum (populate("products.product")).

// Cart return cheyyum.

// 3️⃣ removeProductFromCart (Remove Product from Cart)
// ✅ English:

// Uses userId to find the user's cart.

// Removes the specific product from the cart using $pull.

// Checks if the product was removed (modifiedCount === 0):

// If no changes were made, it throws an error (Failed to remove the product from the cart).

// ✅ Manglish:

// userId use cheythu user de cart find cheyyum.

// Cart il ninnu specific product remove cheyyum ($pull use cheyyum).

// Product remove aayi enno check cheyyum (modifiedCount === 0).

// Remove aayillenkil error (Failed to remove the product from the cart).

// 🔹 Summary
// ✅ English:

// addProductToCart → Adds a product to the cart, increases quantity, and checks stock.

// getUserCart → Fetches the cart details with full product info.

// removeProductFromCart → Removes a product from the cart.

// ✅ Manglish:

// addProductToCart → Product cart il add cheyyum, quantity increase cheyyum, stock check cheyyum.

// getUserCart → Cart il ulla products list cheyyum (full details).

// removeProductFromCart → Cart il ninnu product remove cheyyum.