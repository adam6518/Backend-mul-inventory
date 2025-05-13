import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";

export const registerUser = async (user) => {
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
    console.log([rows]);

    if (rows.length === 0) {
      return { success: false, message: "Username not found" };
    }
    const user = rows[0];
    console.log(user);

    console.log("Password received from client:", password);
    console.log("Hashed password from DB:", user.password);

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("password match");
    console.log(passwordMatch);

    if (!passwordMatch) {
      return { success: false, message: "Incorrect password" };
    }
    return {
      success: true,
      message: "Logged in successfully",
      nama: user.nama,
      username: user.username,
      role: user.role,
      isLoggedIn: true,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Login failed", error: error };
  }
};
