import asyncHandler from "../middleware/asyncHandler.js";
import { addOrderService ,showOrderService } from "../service/orderService.js";
import { STATUS } from "../utils/constants.js";


export const addOrder=asyncHandler(async(req,res)=>{
  const userId=req.user._id
  const {name ,address,PaymentMethod}=req.body

  await addOrderService(name,address,PaymentMethod,userId)
  res.status(200).json({
    status:STATUS.SUCCESS,
    message:"order placed successfully",
  })
})


//get all order
export const showOrders=asyncHandler(async(req,res)=>{
  const userId = req.user._id;
  const { page } = req.query;

  const { orders, pagination } = await showOrderService(userId, parseInt(page, 10) || 1, 10);

  const message = orders.length
    ? "Orders retrieved successfully"
    : "No orders found";
  res.status(200).json({
    status: STATUS.SUCCESS,
    message,
    orders,
    pagination
  })
})




// 1️⃣ addOrder (Place an Order)
// ✅ English:

// Extracts userId from authentication middleware (req.user._id).

// Extracts name, address, and paymentMethod from request body (req.body).

// Calls addOrderService(name, address, paymentMethod, userId) to place the order.

// Returns success response (Order placed successfully).

// ✅ Manglish:

// Authentication middleware ninnu userId edukkum (req.user._id).

// Request body ninnu name, address, paymentMethod edukkum (req.body).

// addOrderService(name, address, paymentMethod, userId) call cheyyum.

// Success response kodukkum (Order placed successfully).

// 2️⃣ showOrders (Get All Orders for a User with Pagination)
// ✅ English:

// Extracts userId from authentication middleware (req.user._id).

// Extracts page number from query parameters (req.query).

// Calls showOrderService(userId, parseInt(page, 10) || 1, 10) to fetch orders with pagination.

// Checks if orders exist:

// If orders found → Returns success message (Orders retrieved successfully).

// If no orders → Returns "No orders found".

// ✅ Manglish:

// Authentication middleware ninnu userId edukkum (req.user._id).

// Query parameters ninnu page number edukkum (req.query).

// showOrderService(userId, parseInt(page, 10) || 1, 10) call cheyyum (pagination use cheyyum).

// Orders undoo enn check cheyyum:

// Orders undenkil "Orders retrieved successfully" return cheyyum.

// Orders illenkil "No orders found" return cheyyum.

// 🔹 Summary
// ✅ English:

// addOrder → Places an order with user details & payment method.

// showOrders → Fetches all orders for a user with pagination.

// ✅ Manglish:

// addOrder → User ude details & payment method use cheythu order place cheyyum.

// showOrders → User ude ellaa orders um pagination use cheythu fetch cheyyum.



