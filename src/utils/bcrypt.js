import bcrypt from "bcrypt";

// 🔐 Hash Password
export const hashPassword = async (password) => {
  const saltRounds = 10; // Standard salt rounds for security
  return await bcrypt.hash(password, saltRounds);
};

// 🔍 Compare Passwords
export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};


