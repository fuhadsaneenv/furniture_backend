import mongoose from "mongoose";

const wishlistSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        },
    ],
})

const Wishlist=mongoose.model("Whishlist",wishlistSchema)
export default Wishlist

