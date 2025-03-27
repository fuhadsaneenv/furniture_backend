import express from 'express'
import authenticate from '../middleware/authMiddleware.js'
import isAdmin from '../middleware/isAdmin.js'
import { allUser,singleUser,userBlock,orderDetails,userCount,grossProfit,totalProductsPurchased } from '../controller/adminController.js'

const router=express.Router()

router.put('/blockUser/:id',authenticate,isAdmin,userBlock)
router.get('/users',authenticate,isAdmin,allUser)
router.get('/users/:id',authenticate,isAdmin,singleUser)
router.get('/order',authenticate,isAdmin,orderDetails)
router.get('/usersCount',authenticate,isAdmin,userCount)
router.get('/grossProfit',authenticate,isAdmin,grossProfit)
router.get('/totalProductsPurchased',authenticate,isAdmin,totalProductsPurchased)
export default router