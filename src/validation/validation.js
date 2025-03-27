import Joi from "joi";
import mongoose, { Schema } from "mongoose";


//user registeration schema

export const userValidationSchema=Joi.object({
    username:Joi.string().min(3).max(30).required(),
    email:Joi.string().email().required(),
    password:Joi.string()
    .min(8)
    .pattern(new RegExp("[A-Z]"))
    .pattern(new RegExp("[0-9]"))
    .required(),
    name:Joi.string().min(3).max(50).required(),
    isAdmin:Joi.boolean().default(false),
    isBlock:Joi.string().required(false)
})

//user login schema

export const loginValidationSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),
})

//product valiation schema

export const productValidationSchema=Joi.object({
    _id:Joi.string().optional(),
    name:Joi.string().min(3).max(50).required(),
    price:Joi.number().positive().required(),
    quantity:Joi.number().integer().min(0).required(),
    url:Joi.string().uri().optional(),
    description:Joi.string().min(10).max(500).required(),
    category:Joi.string().min(3).max(50).required(),
    isDelete:Joi.boolean().default(false),
})

//cart validation schema
export const cartValidationSchema=Joi.object({
    productId:Joi.string().custom((value,helper)=>{
        if(!mongoose.Types.ObjectId.isValid(value)){
            return helper.message("invalid product ID")
        }
        return value
    }).required()
})

//whishlist validation schema
export const wishlistValidationSchema=Joi.object({
    id:Joi.string().custom((value,helper)=>{
        if(!mongoose.Types.ObjectId.isValid(value)){
            return helper.message("invalid product ID")
        }
        return value
    }).required()
})

//order validation schema
export const orderValidationSchema = Joi.object({
    // user: Joi.string().required(),
    // items: Joi.array()
    //   .items(
    //     Joi.object({
    //       productid: Joi.string().required(),
    //       quantity: Joi.number().required(),
    //     })
    //   )
    //   .required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    PaymentMethod: Joi.string().valid("razorpay", "card", "paypal").required(),
    // total: Joi.number().required(),
    
  });

export const validateBody=(Schema)=>(req,res,next)=>{
    const {error}=Schema.validate(req.body,{abortEarly:false})

    if(error){
        return res.status(400).json({errors: error.details.map((err)=>err.message)})
    }
    next()
}

export const validateParams=(Schema)=>(req,res,next)=>{
    const {error}=Schema.validate(req.params,{abortEarly:false})
    if(error){
        return res.status(400).json({error:error.details.map((err)=>err.message)})
    }
    next()

}


