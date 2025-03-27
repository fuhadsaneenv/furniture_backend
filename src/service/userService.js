import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import CustomError from "../utils/customError.js";

//service of new user

export const userRegisterServices=async (data)=>{
    const userExists=await User.findOne({email:data.email})
    if(userExists){
        throw new CustomError("user already exists",400)
    }
    const hashedPassword=await bcrypt.hash(data.password,10)
    const newUser=new User({
        name:data.name,
        email:data.email,
        password:hashedPassword,
        username:data.username,
    })
    const savedUser=await newUser.save()

    return savedUser
}

//services of login user

export const loginUserServices=async (email,password)=>{
    const userData=await User.findOne({email})
    if(!userData){
        throw new CustomError("please create an account, email is invalid ",400)
    }
    const isMatch=await bcrypt.compare(password,userData.password)
    if(!isMatch){
        throw new CustomError("invalid password /email,try agaiin",400)
    }
    if(userData.isBlock){ 
        throw new CustomError("Your account is blocked. Contact support", 403);
    }
    return userData;
}





// 1️⃣ userRegisterServices Function (New User Registration Service)
// ✅ English:

// First, it checks if the email is already registered in the database. If the user exists, it throws an error (User already exists).

// Then, the user’s password is hashed using bcrypt for security.

// A new user object is created and saved in the database.

// Finally, it returns the saved user data.

// ✅ Manglish:

// Muthal database il nokum ithu vare email register aayi ille ennu. User already undenkil error throw cheyyum (User already exists).

// User de password secure aakkan bcrypt use cheyth hash cheyyum.

// Pinne, puthiya user create cheyyum, database il save cheyyum.

// Neritte save cheytha user details return cheyyum.

// 2️⃣ loginUserServices Function (User Login Service)
// ✅ English:

// First, it checks if the email exists in the database. If not, it throws an error (Please create an account, email is invalid).

// Then, it verifies the entered password with the hashed password stored in the database using bcrypt.compare.

// If the password is incorrect, an error is thrown (Invalid password/email, try again).

// If the user is blocked (isBlock is true), an error is thrown (Your account is blocked. Contact support).

// If everything is correct, the user’s data is returned.

// ✅ Manglish:

// Muthal nokkum ithu vare email database il undo ennu. Illenkil error throw cheyyum (Please create an account, email is invalid).

// User kodukkuna password, database il save cheytha hashed password um bcrypt.compare use cheyth compare cheyyum.

// Password shariyallenkil error throw cheyyum (Invalid password/email, try again).

// User block aayit undenkil login cheyyan pattilla (Your account is blocked. Contact support).

// Ellam correct aayal user details return cheyyum.

// 🔹 Summary
// ✅ English:

// userRegisterServices → Registers a new user (with hashed password).

// loginUserServices → Verifies user credentials and checks if the user is blocked.

// ✅ Manglish:

// userRegisterServices → Puthiya user register cheyyum (password hash cheyyum).

// loginUserServices → User login verify cheyyum, block status nokkum.

