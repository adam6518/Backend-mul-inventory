import { pool } from "../config/db.js";

export const getAllFinansial = async () => {
  try {
    const query = `SELECT * FROM finansial`;
    const [rows] = await pool.query(query);
    return {
      success: true,
      message: "Success get all data finansial",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get all data finansial",
      error: error,
    };
  }
};

export const addFinansial = async (finansialArray) => {
  console.log(finansialArray);
  try {
    const values = finansialArray.map((finansial) => [
      finansial.namaProject,
      finansial.pendapatan,
      finansial.modalAwal,
      finansial.profit,
    ]);
    const query = `INSERT INTO finansial (nama_project, pendapatan, modal_awal, profit) VALUES ?`;
    await pool.query(query, [values]);
    return { success: true, message: "Finansial added successfully" };
  } catch (error) {
    return { success: false, message: "Failed to add finansial", error: error };
  }
};

export const checkFinansialExists = async (finansial) => {
  try {
    console.log("Checking existence for:", finansial);
    const query = `
          SELECT COUNT(*) as count FROM finansial 
          WHERE nama_project = ? AND pendapatan = ? AND modal_awal = ? AND profit = ?
        `;
    const values = [
      finansial.namaProject,
      finansial.pendapatan,
      finansial.modalAwal,
      finansial.profit,
    ];
    const [rows] = await pool.query(query, values);
    console.log("Existence check result:", rows[0].count);
    return rows[0].count > 0;
  } catch (error) {
    console.error("Error in checkFinansialExists:", error);
    throw error;
  }
};

export const checkFinansialExistsByName = async (namaProject) => {
  try {
    const query = `SELECT COUNT(*) as count FROM finansial WHERE nama_project = ?`;
    const [rows] = await pool.query(query, [namaProject]);
    return rows[0].count > 0;
  } catch (error) {
    console.error("Error in checkFinansialExistsByName:", error);
    throw error;
  }
};

export const updateFinansialByName = async (namaProject, updateData) => {
  try {
    const { pendapatan, modalAwal, profit } = updateData;
    const query = `
      UPDATE finansial
      SET pendapatan = ?, modal_awal = ?, profit = ?
      WHERE nama_project = ?
    `;
    await pool.query(query, [pendapatan, modalAwal, profit, namaProject]);
    return { success: true, message: "Finansial updated successfully" };
  } catch (error) {
    console.error("Error in updateFinansialByName:", error);
    return { success: false, message: "Failed to update finansial", error };
  }
};

export const sortingFinansial = async (order = "ASC") => {
  console.log(order);

  try {
    const query = `SELECT * FROM finansial ORDER BY pendapatan ${order}`;
    const [rows] = await pool.query(query);
    return {
      success: true,
      message: `Successfully fetched finansial sorted by pendapatan ${order}`,
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch sorted finansial data",
      error,
    };
  }
};

export const searchFinansial = async (item) => {
  try {
    const query = `SELECT * FROM finansial WHERE nama_project LIKE ?`;
    const [rows] = await pool.query(query, [`%${item}%`]);
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
