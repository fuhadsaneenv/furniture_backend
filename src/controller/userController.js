import CustomError from "../utils/customError.js";
import { generateAccessToken,generateRefreshToken,verifyToken } from "../utils/jwt.js";
import { STATUS } from "../utils/constants.js";
import { userRegisterServices,loginUserServices } from "../service/userService.js";
import asyncHandler from "../middleware/asyncHandler.js";


//register user controller

export const registerUser=asyncHandler(async(req,res)=>{
  const data=req.body
  const newUser=await userRegisterServices(data)

  res.status(201).json({
    status:STATUS.SUCCESS,
    message:"user registerd successfully",
    user:{
      id:newUser._id,
      username:newUser.username,
      email:newUser.email
    }
  })
})

//login user controller

export const loginUser=asyncHandler(async(req,res)=>{
  const {email,password}=req.body
  const user=await loginUserServices(email,password)

  //if login success create token

  const accessToken=generateAccessToken(user)
  const refreshToken=generateRefreshToken(user)

  // Set cookies in the response  store token in cookies

  res
  .cookie('accessToken',accessToken,{httpOnly:true, secure:process.env.NODE_ENV==="production", sameSite:"Strict", maxAge:15*60*1000})
  .cookie('refreshToken',refreshToken,{httpOnly:true,secure:process.env.NODE_ENV==="production", sameSite:"Strict", maxAge:7*24*60*60*1000})

  .status(200).json({
    status:STATUS.SUCCESS,
    message:"user logged in successfull",
    user:{
      id:user._id,
      username:user.username,
      email:user.email
    }
  })
})

export const refreshToken=asyncHandler(async(req,res)=>{
  const {refreshToken}=req.cookies

  if(!refreshToken){
    throw new CustomError("refresh token missing ",401)
  }

  const decoded=verifyToken(refreshToken,process.env.JWT_REFRESH_SECRET)
  if(!decoded){
    throw new CustomError("invalid or expired refresh token",403)
  }
  const user=await user.findById(decoded.id)
  if(!user){
    throw new CustomError('user not found',404)
  }
  const newAccessToken=generateAccessToken(user)
  res
  .cookie('accessToken',newAccessToken,{httpOnly:true,secure:process.env.NODE_ENV==="production", sameSite:"Strict", maxAge:15*60*1000})
  .status(200).json({
    status:STATUS.SUCCESS,
    message:"access token refreshed"
  })
})




// 1️⃣ registerUser (User Registration)
// ✅ English:

// Extracts user data from req.body.

// Calls userRegisterServices(data) to create a new user.

// Returns success response with id, username, and email.

// ✅ Manglish:

// Request body ninnu user data edukkum.

// userRegisterServices(data) call cheyyum new user create cheyyan.

// Success response kodukkum (User registered successfully).

// 2️⃣ loginUser (User Login & Token Generation)
// ✅ English:

// Extracts email and password from req.body.

// Calls loginUserServices(email, password) to verify credentials.

// Generates accessToken (short-lived) and refreshToken (long-lived).

// Stores tokens in HTTP-only cookies for security.

// Returns success response with user details.

// ✅ Manglish:

// Request body ninnu email and password edukkum.

// loginUserServices(email, password) call cheyyum credentials verify cheyyan.

// Login success aayal, accessToken and refreshToken generate cheyyum.

// Tokens secure aayittu cookies il store cheyyum (httpOnly: true).

// Success response kodukkum (User logged in successfully).

// 3️⃣ refreshToken (Token Refreshing)
// ✅ English:

// Extracts refreshToken from cookies.

// If missing, throws "Refresh token missing".

// Verifies refreshToken using verifyToken(refreshToken, JWT_REFRESH_SECRET).

// If invalid, throws "Invalid or expired refresh token".

// Finds user by decoded.id.

// If user not found, throws "User not found".

// Generates a new accessToken and updates it in cookies.

// Returns success response (Access token refreshed).

// ✅ Manglish:

// Cookies ninnu refreshToken edukkum.

// Token missing aayenkil "Refresh token missing" error kodukkum.

// Token verify cheyyum using verifyToken(refreshToken, JWT_REFRESH_SECRET).

// Invalid aayenkil "Invalid or expired refresh token" error kodukkum.

// decoded.id use cheythu user fetch cheyyum.

// User illenkil "User not found" error kodukkum.

// Puthiya accessToken generate cheyyum & cookies update cheyyum.

// Success response kodukkum (Access token refreshed).

// 🔹 Summary
// ✅ English:

// registerUser → Registers a new user.

// loginUser → Logs in user & generates tokens (stored in cookies).

// refreshToken → Refreshes access token using a valid refresh token.

// ✅ Manglish:

// registerUser → Puthiya user register cheyyum.

// loginUser → User login cheyyum & secure tokens generate cheyyum.

// refreshToken → Valid refresh token use cheythu puthiya access token generate cheyyum.


