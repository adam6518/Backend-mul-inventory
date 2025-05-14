import userModel from "../models/userModel.js";
import { registerUser, loginUser } from "../services/authServices.js";

export const register = async (req, res) => {
  const { nama, username, password, role } = req.body;

  if (!nama || !username || !password || !role)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });

  const user = new userModel({ nama, username, password, role });

  try {
    const response = await registerUser(user);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return { success: false, message: "failed to create user !!" };
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  console.log(req.body);
  console.log("BODY YANG DITERIMA:", req.body);

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const response = await loginUser(username, password);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
