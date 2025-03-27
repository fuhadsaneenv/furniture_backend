import { getAllProductsService,getProductByIdService,addProductionServices,updateProductService,deleteProductService } from "../service/productService.js";
import { STATUS } from "../utils/constants.js";
import CustomError from "../utils/customError.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//add product 

export const addProduct=asyncHandler(async(req,res)=>{
  //const {name,...rest}=req.body
  let url
  if(req.file&&req.file.path){
    url=req.file.path
  }else{
    return res.status(400).json({
      success:STATUS.ERROR,
      message:"image upload failed ,please incluse a valid image"
    })
  }

  const {name ,description ,category,price,quantity,isDelete}=req.body
// get image path if file exists

const data=await addProductionServices({name ,description,category,price,quantity,isDelete,url})
res.status(201).json({
  success:STATUS.SUCCESS,
  message:"product added successfully",
  data,
})

})

//update product

export const updateProduct=asyncHandler(async(req,res)=>{
  const {_id,url,...updateItems}=req.body
  if(!_id){
    throw new CustomError("product ID required",400)
  }
  const existingProduct= await Product.findById(_id)
  if(!existingProduct){
    throw new CustomError(" product not found",404)
  }

  //handle URL case

  if(url&&!/^https?:\/\/[^\s]+$/.test(url)){
    return res.status(400).json({error:["the provide 'url' is not a valid URL"]})
  }

  //if no url is provided ,use the existing one
  if(!url){
    updateItems.url=existingProduct.url;
  }

  const updateProduct=await updateProductService(_id,updateItems)
  res.status(200).json({status:STATUS.SUCCESS,message:"product update successfully",updateProduct})
})

//delete product

export const deletedProduct=asyncHandler(async(req,res)=>{
  const {id}=req.params

  if(!id){
    throw new CustomError("product  ID is missing in request",400)
  }

  const deletedProduct=await deleteProductService(id)
  res.json({status:STATUS.SUCCESS,message:"deleted product successfully",deletedProduct})

})


//get all products

export const getAllProducts=asyncHandler(async(req,res)=>{
  const {category,page=1,limit=10,search}=req.query;

  const {products,pagination}=await getAllProductsService({
    category,
    page:parseInt(page,10),
    limit:parseInt(limit,10),
    search,
  })

  if(products.length===0){
    res.status(200).json({
      status:STATUS.SUCCESS,
      message:" no product found",

    })
  }else {
    res.status(200).json({
      status:STATUS.SUCCESS,
      products,
      pagination,
    })
  }
})


//get single product
export const singleProduct=asyncHandler(async(req,res)=>{
  const {id}=req.params
  const productOne=await getProductByIdService(id)

  if(!productOne){
    throw new CustomError("product not found ",404)
  }
  res.status(200).json({
    status:STATUS.SUCCESS,
    productOne,
  })
})




// 1️⃣ addProduct (Add a New Product)
// ✅ English:

// Checks if an image file exists (req.file.path). If not, returns an error (Image upload failed).

// Extracts name, description, category, price, quantity, and isDelete from request body.

// Calls addProductionServices to save product details to the database.

// Returns success response (Product added successfully).

// ✅ Manglish:

// req.file.path undoo enn nokkum. Illenkil "Image upload failed" error return cheyyum.

// Request body ninnu name, description, category, price, quantity, isDelete edukkum.

// addProductionServices call cheyyum database il store cheyyan.

// Success response kodukkum (Product added successfully).

// 2️⃣ updateProduct (Update an Existing Product)
// ✅ English:

// Extracts _id, url, and other update fields from request body.

// Checks if _id exists, else returns "Product ID required".

// Finds product by ID (findById(_id)) → If not found, returns "Product not found".

// Validates url format (if provided) → If invalid, returns an error.

// If no new url, keeps the existing one.

// Calls updateProductService(_id, updateItems).

// Returns success response (Product updated successfully).

// ✅ Manglish:

// Request body ninnu _id, url, and update cheyyenda values edukkum.

// _id illaenkil "Product ID required" error kodukkum.

// findById(_id) use cheythu product undoo enn nokkum. Illenkil "Product not found" return cheyyum.

// url format correct aanoo enn nokkum. If invalid, error return cheyyum.

// url provide cheythillaenkil, old URL thanne use cheyyum.

// updateProductService(_id, updateItems) call cheyyum.

// Success response kodukkum (Product updated successfully).

// 3️⃣ deletedProduct (Delete a Product)
// ✅ English:

// Extracts id from request params (req.params).

// Checks if id exists, else throws "Product ID is missing".

// Calls deleteProductService(id) to remove the product.

// Returns success response (Deleted product successfully).

// ✅ Manglish:

// Request params ninnu id edukkum (req.params).

// id illaenkil "Product ID is missing" error kodukkum.

// deleteProductService(id) call cheythu product delete cheyyum.

// Success response kodukkum (Deleted product successfully).

// 4️⃣ getAllProducts (Retrieve All Products with Pagination & Filters)
// ✅ English:

// Extracts category, page, limit, and search from query parameters.

// Calls getAllProductsService with these filters.

// If no products are found, returns "No product found".

// Else, returns the list of products and pagination details.

// ✅ Manglish:

// Query params ninnu category, page, limit, search edukkum.

// getAllProductsService call cheyyum.

// Product illaenkil "No product found" response kodukkum.

// Product undenkil list and pagination details return cheyyum.

// 5️⃣ singleProduct (Get a Single Product by ID)
// ✅ English:

// Extracts id from request params (req.params).

// Calls getProductByIdService(id) to fetch the product.

// If not found, throws "Product not found".

// Returns the product details.

// ✅ Manglish:

// Request params ninnu id edukkum (req.params).

// getProductByIdService(id) call cheyyum product fetch cheyyan.

// Product illenkil "Product not found" error kodukkum.

// Success response kodukkum with product details.

// 🔹 Summary
// ✅ English:

// addProduct → Adds a new product (image upload, validation, and storage).

// updateProduct → Updates product details (validates ID, URL, and updates fields).

// deletedProduct → Deletes a product by ID.

// getAllProducts → Fetches all products with pagination and filters.

// singleProduct → Fetches a single product by ID.

// ✅ Manglish:

// addProduct → Puthiya product add cheyyum (image upload, validation, database store).

// updateProduct → Product details update cheyyum (ID and URL validation, update logic).

// deletedProduct → Product delete cheyyum using ID.

// getAllProducts → Ellaa products um fetch cheyyum with pagination & filters.

// singleProduct → Oru single product fetch cheyyum using ID.