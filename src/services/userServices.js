import { pool } from "../config/db.js";

export const getAllDataUser = async () => {
  try {
    const query = `SELECT * FROM data_users`;
    const [rows] = await pool.query(query);
    return {
      success: true,
      message: "Success get all data users",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get all data users",
      error: error,
    };
  }
};

export const deleteDataUser = async (userId) => {
  console.log(userId);

  try {
    const query = `DELETE FROM data_users WHERE iddata_users = ?`;
    await pool.query(query, [userId]);
    return { success: true, message: "Success delete data user" };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete data user",
      error: error,
    };
  }
};

export const searchUser = async (nama) => {
  console.log(nama);

  try {
    const query = `SELECT * FROM data_users WHERE nama LIKE ?`;
    const [rows] = await pool.query(query, [`%${nama}%`]);

    if (rows.length > 0) {
      return { success: true, message: "Data ditemukan", data: rows };
    } else {
      return {
        success: false,
        message: "Tidak ada data yang sesuai",
        data: [],
      };
    }
  } catch (error) {
    return { success: false, message: "Terjadi kesalahan pada server", error };
  }
};

export const updateUser = async (user) => {
  console.log(user);

  try {
    const query = `
            UPDATE data_users
            SET nama = ?, username = ?, role = ?
            WHERE iddata_users = ?
        `;
    const values = [user.nama, user.username, user.role, user.iddata_users];
    console.log(values);

    await pool.query(query, values);
    return { success: true, message: "User updated successfully" };
  } catch (error) {
    return { success: false, message: "Failed to update user", error };
  }
};
