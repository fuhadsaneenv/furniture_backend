import express from 'express'
// import {getAllProducts,singleProduct,addProduct,deleteProduct,updateProduct} from '../controllers/productController.js'
import { getAllProducts,singleProduct,addProduct,deletedProduct,updateProduct } from '../controller/productController.js';
import isAdmin from '../middleware/isAdmin.js';
import authenticate from '../middleware/authMiddleware.js';
import { validateBody,productValidationSchema } from '../validation/validation.js';
import { upload } from '../config/cloudinaryConfig.js';

const router=express.Router()

// Public Routes-No authentication required

router.get('/', getAllProducts);
router.get('/:id', singleProduct);

// Admin Routes
router.post('/addProduct',authenticate,isAdmin,upload.single('url'),validateBody(productValidationSchema),addProduct);     //ivide upload with the field name -image/url adhavanam req kodukkendadh addproduct timel postman
router.delete('/deleteProduct/:id',authenticate,isAdmin,deletedProduct);
router.put('/updateProduct',authenticate,isAdmin,validateBody(productValidationSchema),updateProduct);


export default router;