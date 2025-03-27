import jwt from 'jsonwebtoken';

export const generateAccessToken=(user)=>{
  const payload= {id: user._id}
  return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"45m"})
};
//Ithu Access Token generate cheyyan aanu. User login cheyyumbo API secure aakan JWT (JSON Web Token) create cheyyum.

export const generateRefreshToken=(user)=>{
  const payload={id:user._id};
  return jwt.sign(payload,process.env.JWT_REFRESH_SECRET, {expiresIn:'7d'})
}
//Ithu Refresh Token generate cheyyan aanu. Access token expire aayal (eg: 45 minutes kazhinju), new access token create cheyyan refresh token use cheyyum.

export const verifyToken=(token,secret)=>{
  try{
    return jwt.verify(token,secret)
  }catch(error){
    return null
  }
//Ithu JWT Token verify cheyyan use cheyyunnu. Token valid aano, fake aano, expire aayo nokkan aanu.



};

