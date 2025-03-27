

import express from 'express'
import { addToCart,removeFromCart,getCart,incrementProductQuantity,decrementProductQuantity } from '../controller/cartController.js';
import authenticate from '../middleware/authMiddleware.js';
import { validateParams } from '../validation/validation.js';
import { cartValidationSchema } from '../validation/validation.js';

const router = express.Router();

router.post('/addToCart/:productId',authenticate,validateParams(cartValidationSchema),addToCart);
router.get('/getCart',authenticate,getCart);
router.delete('/removeFromCart/:productId',authenticate,removeFromCart);

// Increment and Decrement routes
router.patch('/increment/:productId',authenticate, incrementProductQuantity); 
router.patch('/decrement/:productId',authenticate, decrementProductQuantity); 


export default router;



