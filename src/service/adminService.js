import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import CustomError from "../utils/customError.js";


//user block

export const userBlockService=async(id)=>{
    const userDetails=await User.findById(id)
    if(!userDetails){
        throw new CustomError("user not found",400)
    }
    userDetails.isBlock=!userDetails.isBlock
    await userDetails.save({validateBeforeSave:false})
    return userDetails
}

//get all user-non-admin user

export const getAllUserServices=async(limit,skip)=>{
    const usersList=await User
    .find({isAdmin:{$ne:true}})
    .skip(skip)
    .limit(limit)
    const totalUsers= await User.countDocuments({isAdmin:{$ne:true}})
    return{usersList,totalUsers}
}

//specific user

export const singleUserServices=async(id)=>{
    const users=await User.findById(id)
    if(!users)
        throw CustomError("user not found",400)
    else
    return users
}

//order list
export const getAllOrderServices=async (id)=>{
    const orderdata=await Order.find()
    return orderdata
}




//get total revenue
export const getGrossProfitServices=async()=>{
    const result=await Order.aggregate([{$group:{_id:null,totalRevenue:{$sum:"$total"}}}])
    return result
}

//get total product purchased
export const getTotalProductsPurchasedServices = async () => {
    const result = await Order.aggregate([
        { $unwind: "$items" },  
        { 
            $group: { 
                _id: null, 
                TotalProductsPurchased: { $sum: "$items.quantity" } 
            } 
        }
    ]);
    return result;
};





// 1️⃣ userBlockService (Block/Unblock a User)
// ✅ English:

// Finds the user by id.

// If user not found, throws an error (User not found).

// Toggles isBlock status (if blocked, unblocks; if unblocked, blocks).

// Saves the updated user details (validateBeforeSave: false to skip validation).

// Returns the updated user data.

// ✅ Manglish:

// User de id find cheyyum.

// User illenkil error throw cheyyum (User not found).

// User de block/unblock status maattum (isBlock true → false, false → true).

// User save cheyyum (validateBeforeSave: false vech).

// Updated user details return cheyyum.

// 2️⃣ getAllUserServices (Get All Non-Admin Users)
// ✅ English:

// Fetches all users except admins (isAdmin: { $ne: true }).

// Supports pagination (limit & skip).

// Counts total non-admin users.

// Returns both the user list and total count.

// ✅ Manglish:

// Admin allaatha users list cheyyum (isAdmin: { $ne: true }).

// Pagination support cheyyum (limit & skip).

// Total non-admin users count cheyyum.

// Users list and total count return cheyyum.

// 3️⃣ singleUserServices (Get a Specific User)
// ✅ English:

// Finds the user by id.

// If user not found, throws an error (User not found).

// Returns the user data.

// ✅ Manglish:

// id use cheythu user find cheyyum.

// User illenkil error throw cheyyum (User not found).

// User data return cheyyum.

// 4️⃣ getAllOrderServices (Get All Orders List)
// ✅ English:

// Fetches all orders from the database.

// Returns the list of orders.

// ✅ Manglish:

// Database il ninnu ellaa orders um fetch cheyyum.

// Orders list return cheyyum.

// 5️⃣ getGrossProfitServices (Calculate Total Revenue)
// ✅ English:

// Uses MongoDB aggregate function to sum total field of all orders.

// Returns total revenue generated from orders.

// ✅ Manglish:

// MongoDB aggregate use cheythu orders il ninnu total revenue calculate cheyyum.

// Revenue return cheyyum.

// 6️⃣ getTotalProductsPurchasedServices (Get Total Products Purchased)
// ✅ English:

// Uses MongoDB aggregation:

// $unwind: "$items" → Expands array items into separate documents.

// $group: { _id: null, TotalProductsPurchased: { $sum: "$items.quantity" } } → Counts total quantity of products purchased.

// Returns total number of products purchased.

// ✅ Manglish:

// MongoDB aggregation use cheyyum:

// $unwind: "$items" → Array il ulla items separate cheyyum.

// $group vech total purchased products count cheyyum.

// Total products purchased return cheyyum.

// 🔹 Summary
// ✅ English:

// userBlockService → Blocks/unblocks a user.

// getAllUserServices → Fetches all non-admin users.

// singleUserServices → Fetches a specific user.

// getAllOrderServices → Fetches all orders.

// getGrossProfitServices → Calculates total revenue.

// getTotalProductsPurchasedServices → Calculates total purchased products.

// ✅ Manglish:

// userBlockService → User block/unblock cheyyum.

// getAllUserServices → Admin allaatha users list cheyyum.

// singleUserServices → Specific user details fetch cheyyum.

// getAllOrderServices → Orders list fetch cheyyum.

// getGrossProfitServices → Total revenue calculate cheyyum.

// getTotalProductsPurchasedServices → Total products purchased count cheyyum.

