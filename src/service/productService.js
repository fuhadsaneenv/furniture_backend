import Product from "../models/productModel.js";
import CustomError from "../utils/customError.js";

// ✅ Add new product
export const addProductionServices = async ({ name, ...rest }) => {
    const existingItem = await Product.findOne({ name });

    if (existingItem) {
        throw new CustomError("Product already exists", 400);
    }

    const newProduct = new Product({ name, ...rest });
    await newProduct.save();
    return newProduct;
};

// ✅ Update a product
export const updateProductService = async (_id, updateItem) => {
    const existing = await Product.findById(_id);

    if (!existing) {
        throw new CustomError("Product is unavailable", 400);
    }

    const data = await Product.findByIdAndUpdate(
        _id,
        { $set: { ...updateItem } },
        { new: true }
    );
    return data;
};

// ✅ Delete single product
export const deleteProductService = async (productId) => {
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
        throw new CustomError("Product is unavailable", 400);
    }

    return await Product.findByIdAndUpdate(productId, { isDelete: true }, { new: true });
};

// ✅ Get all products
export const getAllProductsService = async ({ category, page = 1, limit = 10, search }) => {
    const query = { isDelete: false };

    if (category) {
        query.category = { $regex: `^${category}$`, $options: "i" };
    }

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } }
        ];
    }

    const skip = (page - 1) * limit;
    const total = await Product.countDocuments(query);
    const products = await Product.find(query).skip(skip).limit(limit);

    return {
        products,
        pagination: {
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        },
    };
};

// ✅ Get product by ID
export const getProductByIdService = async (id) => {
    const productDetails = await Product.findById(id);

    if (!productDetails) {
        throw new CustomError("Product not found", 404);
    }

    return productDetails;
};




// 1️⃣ addProductionServices (Add New Product)
// ✅ English:

// First, it checks whether a product with the same name already exists in the database.

// If it exists, it throws an error (Product already exists).

// If not, a new product is created and saved in the database.

// Finally, it returns the newly created product.

// ✅ Manglish:

// Muthal nokkum ithu vare database il athe name ulla product undo ennu.

// Already undenkil error throw cheyyum (Product already exists).

// Illa enkil puthiya product create cheyyum, database il save cheyyum.

// Pinne athinte details return cheyyum.

// 2️⃣ updateProductService (Update an Existing Product)
// ✅ English:

// First, it checks whether the product exists in the database using _id.

// If the product is not found, it throws an error (Product is unavailable).

// Otherwise, it updates the product details using findByIdAndUpdate.

// Finally, it returns the updated product data.

// ✅ Manglish:

// Muthal nokkum ithu vare product database il undenkil _id use cheythu.

// Product illenkil error throw cheyyum (Product is unavailable).

// Product database il undenkil update cheyyum findByIdAndUpdate use cheythu.

// Pinne updated product return cheyyum.

// 3️⃣ deleteProductService (Soft Delete a Product)
// ✅ English:

// First, it checks whether the product exists in the database.

// If the product does not exist, it throws an error (Product is unavailable).

// Instead of deleting it permanently, it sets isDelete: true (soft delete).

// Finally, it returns the updated product with the isDelete flag.

// ✅ Manglish:

// Muthal nokkum ithu vare product database il undo ennu.

// Illenkil error throw cheyyum (Product is unavailable).

// Delete cheyyan pakaram, product ne hide cheyyum (isDelete: true).

// Pinne athinte details return cheyyum.

// 4️⃣ getAllProductsService (Get All Products with Pagination & Search)
// ✅ English:

// Fetches products that are not deleted (isDelete: false).

// If a category is provided, it filters the products by category.

// If a search term is provided, it looks for matching product names and categories.

// Implements pagination:

// page: Current page number.

// limit: Number of products per page.

// totalPages: Total number of pages.

// Returns the list of products and pagination details.

// ✅ Manglish:

// isDelete: false ulla products mathram fetch cheyyum (deleted alla products).

// Category koduthal athinte base il filter cheyyum.

// Search koduthal product name & category nokkum.

// Pagination support undu:

// page: Ethu page aanu fetch cheyyunne.

// limit: Oru page il ethra products venam.

// totalPages: Total ethra pages undennu kanikkan.

// Ellam set aayal list of products return cheyyum.

// 5️⃣ getProductByIdService (Get Product by ID)
// ✅ English:

// First, it searches for the product using _id.

// If the product does not exist, it throws an error (Product not found).

// Otherwise, it returns the product details.

// ✅ Manglish:

// Muthal database il ninnu _id use cheythu product search cheyyum.

// Product illenkil error throw cheyyum (Product not found).

// Undenkil athinte details return cheyyum.

// 🔹 Summary
// ✅ English:

// addProductionServices → Adds a new product (checks for duplicates).

// updateProductService → Updates a product's details.

// deleteProductService → Soft deletes a product.

// getAllProductsService → Fetches all products with search & pagination.

// getProductByIdService → Fetches a single product by ID.

// ✅ Manglish:

// addProductionServices → Puthiya product add cheyyum (duplicate undenkil error).

// updateProductService → Oru product update cheyyum.

// deleteProductService → Soft delete cheyyum (delete aakkathe hide cheyyum).

// getAllProductsService → Ella products fetch cheyyum, search & pagination support.

// getProductByIdService → Single product fetch cheyyum (ID use cheyyi).

