import userModel from "../models/userModel.js";
import {
  getAllDataUser,
  deleteDataUser,
  searchUser,
  updateUser,
} from "../services/userServices.js";

export const getAllDataUserController = async (req, res) => {
  try {
    const response = await getAllDataUser();

    if (response.success) {
      return res.status(200).json({
        success: true,
        message: response.message,
        data: response.data,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: response.message });
    }
  } catch (error) {
    return { success: false, message: "Failed to get data users" };
  }
};

export const deleteDataUserController = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const response = await deleteDataUser(userId);
    if (response.success) {
      return res.status(200).json({
        success: true,
        message: response.message,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: response.message });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const searchDataUserController = async (req, res) => {
  const { nama } = req.query;
  console.log(nama);

  try {
    const response = await searchUser(nama);
    if (response.success) {
      return res.status(200).json({
        success: true,
        message: response.message,
        data: response.data,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: response.message, data: [] });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateUserController = async (req, res) => {
  const { iddata_users, nama, username, role } = req.body;

  if (!iddata_users || !nama || !username || !role) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const user = {
    iddata_users,
    nama,
    username,
    role,
  };

  try {
    const response = await updateUser(user);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
