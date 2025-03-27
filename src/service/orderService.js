import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import CustomError from "../utils/customError.js";

export const addOrderService = async (
  name,
  address,
  paymentMethod,
  userId
) => {

  const cart = await Cart.findOne({ user: userId });
  if (!cart || cart.products.length === 0) {
    throw new CustomError(
      "Your cart is empty. Add items before placing an order."
    );
  }

  // Initialize the total to 0
  let total = 0;

  // Create order
  const order = new Order({
    user: userId,
    items: [],
    date: new Date(),
    name,
    address,
    paymentMethod,
    total,  // Set the total dynamically
  });

  for (let item of cart.products) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw new CustomError(`Product with ID "${item.product}" does not exist.`);
    }

    if (product.quantity < item.quantity) {
      throw new CustomError(`Insufficient quantity for ${product.name}.`);
    }

    product.quantity -= item.quantity;
    await product.save();

    // Calculate the total for this item
    const itemTotal = product.price * item.quantity;
    total += itemTotal;

    order.items.push({ productId: item.product, quantity: item.quantity });
  }

  // Now that total is calculated, save the order with the correct total
  order.total = total;
  await order.save();

  // Clear the cart
  cart.products = [];
  await cart.save();
}



export const showOrderService = async (userId, page = 1, limit = 10) => {

  if (!userId) {         
    throw new CustomError("User ID is required to fetch orders.");
  }

  const skip = (page - 1) * limit;                                        // Calculate pagination parameters
  const orders = await Order.find({ user: userId })                       // Fetch orders for the user, sorted by the most recent
    .sort({ date: -1 })                                                    // Sort by descending date
    .skip(skip)
    .limit(limit)
    .populate({
      path: "items.productId",
      model: "Product",
    });

  if (!orders.length) {
    throw new CustomError("No orders found", 404);
  }

  const totalOrders = await Order.countDocuments({ user: userId });     // Get total order count for pagination

  const pagination = {
    currentPage: page,
    totalPages: Math.ceil(totalOrders / limit),
    totalOrders,
  };

  return { orders, pagination };
};




// 1️⃣ addOrderService (Add a New Order)
// ✅ English:

// Finds the user's cart using userId. If the cart is empty, it throws an error (Your cart is empty).

// Initializes total = 0 to keep track of the order's total price.

// Creates a new order with user details (name, address, paymentMethod, total).

// Loops through the cart products:

// Checks if the product exists; otherwise, throws an error.

// Checks stock availability; if the quantity is not enough, throws an error.

// Updates product stock by reducing the quantity.

// Calculates total price for each product (price * quantity) and adds it to the order.

// Saves the order with the final total price.

// Clears the cart after placing the order.

// ✅ Manglish:

// User de cart find cheyyum (userId use cheythu).

// Cart empty aayal error throw cheyyum (Your cart is empty).

// Total price track cheyyan total = 0 set cheyyum.

// Puthiya order create cheyyum (user details, total price etc.).

// Cart il ulla products loop cheyyum:

// Product exist cheyyunno nokkum. Illenkil error.

// Stock mathi enno nokkum. Mathi illenkil error.

// Stock reduce cheyyum.

// Product price × quantity = total calculate cheyyum.

// Final total save cheyyum, order database il save cheyyum.

// Cart clear cheyyum (products remove cheyyum).

// 2️⃣ showOrderService (Get User Orders with Pagination)
// ✅ English:

// Checks if userId is provided; if not, it throws an error (User ID is required).

// Calculates pagination parameters (skip = (page - 1) * limit).

// Fetches the user's orders from the database:

// Sorted by most recent orders first (date: -1).

// Uses .skip(skip).limit(limit) for pagination.

// Populates product details using populate("items.productId").

// If no orders exist, it throws an error (No orders found).

// Calculates total pages using totalOrders / limit for pagination.

// Returns the list of orders along with pagination details.

// ✅ Manglish:

// userId undenkil check cheyyum, illenkil error throw cheyyum.

// Pagination parameters calculate cheyyum (skip = (page - 1) * limit).

// User de orders database il ninnu fetch cheyyum:

// Date order il sort cheyyum (recent orders first).

// Pagination use cheyyum (skip & limit).

// Product details populate cheyyum.

// Orders illa enkil error throw cheyyum (No orders found).

// Total orders / limit calculate cheyyum to find total pages.

// Orders list return cheyyum along with pagination.

// 🔹 Summary
// ✅ English:

// addOrderService → Places an order, updates stock, clears cart.

// showOrderService → Fetches user orders, supports pagination, sorts by recent orders.

// ✅ Manglish:

// addOrderService → Order place cheyyum, stock update cheyyum, cart empty cheyyum.

// showOrderService → User de orders fetch cheyyum, pagination support undu.

