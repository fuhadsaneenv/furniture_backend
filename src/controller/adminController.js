import asyncHandler from "../middleware/asyncHandler.js";
import { STATUS } from "../utils/constants.js";
import {getAllUserServices, userBlockService,getAllOrderServices,singleUserServices,getGrossProfitServices,getTotalProductsPurchasedServices } from "../service/adminService.js";

//user blocking

export const userBlock=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const user=await userBlockService(id)
    const message=user.isBlock?"user is blocked":"user is unblocked"
    res.json({
        status:STATUS.SUCCESS,
        message
    })
})

//all users

export const allUser = asyncHandler(async (req, res) => {
    const { page } = req.query;
    const pageInt = parseInt(page, 10) || 1;
    const limit = 10;
    const skip = (pageInt - 1) * limit;

    try {
        const { usersList, totalUsers } = await getAllUserServices(limit, skip);

        const message = usersList.length ? "User list retrieved" : "No users found";
        const totalPages = Math.ceil(totalUsers / limit);

        res.json({
            status: STATUS.SUCCESS,
            message,
            data: {
                users: usersList,
                totalUsers,
                totalPages,
                currentPage: pageInt,
            },
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ status: "error", message: "Failed to fetch users" });
    }
});



//single user 

export const singleUser=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const user=await singleUserServices(id)
    res.json ({status:STATUS.SUCCESS,message:"user details...",user})

})

//order list

export const orderDetails=asyncHandler(async(req,res)=>{
    const orderList=await getAllOrderServices()
    res.json({status:STATUS.SUCCESS,message:"order list ...",order:orderList})

})

//user count 

export const userCount = asyncHandler(async (req, res) => {
    try {
        const { totalUsers } = await getAllUserServices(10, 1);  

        const message = totalUsers ? "User list" : "No user found";

        res.json({
            status: STATUS.SUCCESS,
            message,
            totalUsers
        });

    } catch (error) {
        console.error("Error fetching user count:", error);
        res.status(500).json({ status: "error", message: "Failed to fetch user count" });
    }
});
//total revenue

export const grossProfit=asyncHandler(async(req,res)=>{
    const totalprofit=await getGrossProfitServices()
    const total=totalprofit.length>0?totalprofit[0].totalRevenue:0
    res.json({status:STATUS.SUCCESS,message:"total revenue", total})
})

//get total producs purchased

export const totalProductsPurchased = asyncHandler(async (req, res) => {
    const totalProducts = await getTotalProductsPurchasedServices();
    const total = totalProducts.length > 0 ? totalProducts[0].TotalProductsPurchased : 0;
    
    res.json({
        status: STATUS.SUCCESS,
        message: "Total products purchased",
        total
    });
});



// 
// 1️⃣ userBlock (Block/Unblock a User)
// ✅ English:

// Extracts id from request parameters (req.params).

// Calls userBlockService(id) to toggle the user's block status.

// Sends response with success status & message (User is blocked/unblocked).

// ✅ Manglish:

// Request parameters ninnu id edukkum (req.params).

// userBlockService(id) call cheythu block/unblock status maattum.

// Response il success message kodukkum (User is blocked/unblocked).

// 2️⃣ allUser (Fetch All Non-Admin Users - With Pagination)
// ✅ English:

// Extracts page number from query parameters (req.query).

// Converts it to an integer (parseInt(page, 10) || 1).

// Defines pagination limit (limit = 10).

// Calculates skip value ((page - 1) * limit).

// Calls getAllUserServices(limit, skip) to fetch users.

// Calculates total pages (Math.ceil(totalUsers / limit)).

// Returns user list, total count, and pagination details.

// ✅ Manglish:

// Query parameters il ninnu page edukkum (req.query).

// Integer aayi convert cheyyum (parseInt(page, 10) || 1).

// Pagination limit set cheyyum (limit = 10).

// Skip value calculate cheyyum ((page - 1) * limit).

// getAllUserServices(limit, skip) call cheyyum.

// Total pages calculate cheyyum (Math.ceil(totalUsers / limit)).

// Users list, total count, and pagination details return cheyyum.

// 3️⃣ singleUser (Get a Specific User by ID)
// ✅ English:

// Extracts id from request parameters (req.params).

// Calls singleUserServices(id) to fetch user details.

// Returns user details in response.

// ✅ Manglish:

// Request parameters il ninnu id edukkum (req.params).

// singleUserServices(id) call cheyyum.

// User details response il return cheyyum.

// 4️⃣ orderDetails (Fetch All Orders)
// ✅ English:

// Calls getAllOrderServices() to retrieve all orders.

// Returns order list in response.

// ✅ Manglish:

// getAllOrderServices() call cheyyum.

// Ellaa orders um response il return cheyyum.

// 5️⃣ userCount (Get Total User Count)
// ✅ English:

// Calls getAllUserServices(10, 1) to fetch users (fix: should count users instead).

// Checks if users exist (totalUsers).

// Returns total user count in response.

// ✅ Manglish:

// getAllUserServices(10, 1) call cheyyum.

// Users undoo enn check cheyyum (totalUsers).

// Total users response il return cheyyum.

// 6️⃣ grossProfit (Calculate Total Revenue from Orders)
// ✅ English:

// Calls getGrossProfitServices() to aggregate total revenue.

// Checks if revenue exists (totalprofit.length > 0).

// Extracts total revenue (totalprofit[0].totalRevenue or 0).

// Returns total revenue in response.

// ✅ Manglish:

// getGrossProfitServices() call cheyyum.

// Revenue undoo enn check cheyyum (totalprofit.length > 0).

// Total revenue eduth totalprofit[0].totalRevenue illenkil 0 kodukkum.

// Response il return cheyyum.

// 7️⃣ totalProductsPurchased (Calculate Total Purchased Products)
// ✅ English:

// Calls getTotalProductsPurchasedServices() to aggregate total purchased items.

// Checks if data exists (totalProducts.length > 0).

// Extracts total quantity (totalProducts[0].TotalProductsPurchased or 0).

// Returns total purchased product count in response.

// ✅ Manglish:

// getTotalProductsPurchasedServices() call cheyyum.

// Data undoo enn check cheyyum (totalProducts.length > 0).

// Total products eduth totalProducts[0].TotalProductsPurchased illenkil 0 kodukkum.

// Response il return cheyyum.

// 🔹 Summary
// ✅ English:

// userBlock → Blocks/unblocks a user.

// allUser → Fetches all users with pagination.

// singleUser → Fetches a single user's details.

// orderDetails → Fetches all orders.

// userCount → Returns the total number of users.

// grossProfit → Calculates total revenue.

// totalProductsPurchased → Calculates total products purchased.

// ✅ Manglish:

// userBlock → User block/unblock cheyyum.

// allUser → Admin allaatha users list cheyyum (pagination included).

// singleUser → Specific user details fetch cheyyum.

// orderDetails → Orders list fetch cheyyum.

// userCount → Total users count return cheyyum.

// grossProfit → Total revenue calculate cheyyum.

// totalProductsPurchased → Total products purchased count cheyyum.