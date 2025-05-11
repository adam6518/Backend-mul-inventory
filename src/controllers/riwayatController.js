import riwayatModel from "../models/riwayatModel.js";
import {
  getAllRiwayat,
  addRiwayat,
  searchRiwayat,
  sortingRiwayat,
} from "../services/riwayatServices.js";

export const getAllRiwayatController = async (req, res) => {
  try {
    const response = await getAllRiwayat();
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
    return { success: false, message: "Failed to get data history" };
  }
};

export const addRiwayatController = async (req, res) => {
  const riwayatArray = req.body; // Expecting array directly in body

  if (!Array.isArray(riwayatArray) || riwayatArray.length === 0) {
    return res
      .status(400)
      .json({ message: "Request body must be a non-empty array" });
  }

  // Validate each riwayat object
  for (const riwayatData of riwayatArray) {
    const { itemOrdered, lokasiPenanaman, qtyOrdered, tanggalOrder } =
      riwayatData;
    const numericQtyOrdered = parseFloat(qtyOrdered);

    if (
      !itemOrdered ||
      !lokasiPenanaman ||
      isNaN(numericQtyOrdered) ||
      !tanggalOrder
    ) {
      return res.status(400).json({
        message: "All fields are required and qtyOrdered must be a number",
      });
    }
  }

  try {
    // Pass the entire array to the service for batch insert
    const response = await addRiwayat(riwayatArray);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add riwayat entries",
      error,
    });
  }
};

export const searchRiwayatController = async (req, res) => {
  const { item } = req.query;
  console.log(item);
  try {
    const response = await searchRiwayat(item);
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

export const sortingRiwayatController = async (req, res) => {
  const order = req.query.order === "DESC" ? "DESC" : "ASC";
//   console.log(order);
  
  try {
    const response = await sortingRiwayat(order);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
