import { pool } from "../config/db.js";

export const addRiwayat = async (riwayatArray) => {
  try {
    const values = riwayatArray.map((riwayat) => [
      riwayat.itemOrdered,
      riwayat.lokasiPenanaman,
      riwayat.qtyOrdered,
      riwayat.tanggalOrder,
    ]);
    const query = `INSERT INTO riwayat (item_ordered, lokasi_penanaman, qty_ordered, tanggal_order) VALUES ?`;
    await pool.query(query, [values]);
    return { success: true, message: "Batch riwayat added successfully" };
  } catch (error) {
    return { success: false, message: "Failed to add batch riwayat", error };
  }
};

export const getAllRiwayat = async () => {
  try {
    const query = `SELECT * FROM riwayat`;
    const [rows] = await pool.query(query);
    return {
      success: true,
      message: "Success get all data history",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get all data history",
      error: error,
    };
  }
};

export const searchRiwayat = async (item) => {
  try {
    const query = `SELECT * FROM riwayat WHERE item_ordered LIKE ?`;
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

export const sortingRiwayat = async (order = "ASC") => {  
  try {
    const query = `SELECT * FROM riwayat ORDER BY tanggal_order ${order}`;
    const [rows] = await pool.query(query);
    return {
      success: true,
      message: `Successfully fetched riwayat sorted by tanggal_order ${order}`,
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch sorted riwayat data",
      error,
    };
  }
};
