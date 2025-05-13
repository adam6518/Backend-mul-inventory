import { pool } from "../config/db.js";

export const addOrder = async (order) => {
  try {
    const query = `INSERT INTO data_order (item_pekerjaan, nama_project, volume_bq, qty_reject, qty_order, tanggal_checklist, tahapan) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      order.itemPekerjaan,
      order.namaProject,
      order.volumeBq,
      order.qtyReject,
      order.qtyOrder,
      order.tanggalChecklist,
      order.tahapan,
    ];
    await pool.query(query, values);
    return { success: true, message: "Order added successfully" };
  } catch (error) {
    return { success: false, message: "Failed to add order", error: error };
  }
};

export const getAllOrder = async () => {
  try {
    const query = `SELECT * FROM data_order`;
    const [rows] = await pool.query(query);
    return {
      success: true,
      message: "Success get all data order",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get all data order",
      error: error,
    };
  }
};

export const deleteAllOrder = async () => {
  try {
    const query = `DELETE FROM data_order`;
    await pool.query(query);
    return { success: true, message: "Success delete all data order" };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete all data order",
      error: error,
    };
  }
};

export const deleteDataOrder = async (orderId) => {
  console.log(orderId);

  try {
    const query = `DELETE FROM data_order WHERE iddata_order = ?`;
    await pool.query(query, [orderId]);
    return { success: true, message: "Success delete data order" };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete data order",
      error: error,
    };
  }
};

export const searchOrder = async (itemPekerjaan) => {
  try {
    const query = `SELECT * FROM data_order WHERE item_pekerjaan LIKE ?`;
    const [rows] = await pool.query(query, [`%${itemPekerjaan}%`]);
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

export const updateOrder = async (order) => {
  try {
    const query = `
            UPDATE data_order
            SET item_pekerjaan = ?, nama_project = ?, volume_bq = ?, qty_reject = ?, qty_order = ?, tanggal_checklist = ?, tahapan = ?
            WHERE iddata_order = ?
        `;
    const values = [
      order.item_pekerjaan,
      order.nama_project,
      order.volume_bq,
      order.qty_reject,
      order.qty_order,
      order.tanggal_checklist,
      order.tahapan,
      order.iddata_order,
    ];
    console.log(values);
    await pool.query(query, values);
    return { success: true, message: "Order updated successfully" };
  } catch (error) {
    return { success: false, message: "Failed to update project", error };
  }
};
