import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "ldssfsdgsfkopg";

export const registerUser = async (user) => {
  console.log(user);

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const query = `INSERT INTO data_users (nama, username, password, role) VALUES (?, ?, ?, ?)`;
    const values = [user.nama, user.username, hashedPassword, user.role];

    await pool.query(query, values);
    return { success: true, message: "User registered successfully" };
  } catch (error) {
    return { success: false, message: "failed to create user", error: error };
  }
};

export const loginUser = async (username, password) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM data_users WHERE username=?`,
      [username]
    );
    if (rows.length === 0) {
      return { success: false, message: "Username not found" };
    }
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { success: false, message: "Incorrect password" };
    }
    const token = jwt.sign(
      { id: user.iddata_users, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return { success: true, message: "Logged in successfully", token: token };
  } catch (error) {
    console.log(error);
    return { success: false, message:"Login failed", error: error };
  }
};

// export const getUserFromToken = async (token) => {
//   try {
//     const trimmedToken = token.trim()
//     const decodedToken = await jwt.verify(trimmedToken, JWT_SECRET)

//     const [rows] = await pool.query(`select iddata_users, nama, username from data_users where username = ?`, [decodedToken.username])
//     if(rows.length === 0) {
//       return { success: false, message:"User not found", error: error };
//     }
//     return { success: true, data: rows[0] };
//   } catch(error) {
//     return { success: false, message:"Invalid token", error: error };
//   }
// }