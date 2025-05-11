import finansialModel from "../models/finansialModel.js";
import {
  getAllFinansial,
  addFinansial,
  checkFinansialExists,
  checkFinansialExistsByName,
  updateFinansialByName,
  sortingFinansial,
  searchFinansial,
} from "../services/finansialServices.js";

export const getAllFinansialController = async (req, res) => {
  try {
    const response = await getAllFinansial();
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
    return { success: false, message: "Failed to get data finansial" };
  }
};

export const addFinansialController = async (req, res) => {
  const finansialArray = req.body;
  console.log(req.body);

  if (!Array.isArray(finansialArray) || finansialArray.length === 0) {
    return res
      .status(400)
      .json({ message: "Request body must be a non-empty array" });
  }

  const newFinansialEntries = [];
  const updatedEntries = [];

  for (const finansialData of finansialArray) {
    const { namaProject, pendapatan, modalAwal, profit } = finansialData;
    const numericPendapatan = parseFloat(pendapatan);
    // const numericModalAwal = parseFloat(modalAwal);
    // const numericProfit = parseFloat(profit);

    if (!namaProject || isNaN(numericPendapatan)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if project exists by name only
    const existsByName = await checkFinansialExistsByName(namaProject);

    if (existsByName) {
      // Update only changed fields
      const updateResponse = await updateFinansialByName(namaProject, {
        pendapatan: numericPendapatan,
        modalAwal,
        profit,
      });
      if (!updateResponse.success) {
        return res.status(500).json({
          success: false,
          message: `Failed to update finansial for project ${namaProject}`,
          error: updateResponse.error,
        });
      }
      updatedEntries.push(finansialData);
    } else {
      newFinansialEntries.push(finansialData);
    }
  }

  if (newFinansialEntries.length > 0) {
    const insertResponse = await addFinansial(newFinansialEntries);
    if (!insertResponse.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to add new finansial entries",
        error: insertResponse.error,
      });
    }
  }

  return res.status(200).json({
    success: true,
    message: `Inserted ${newFinansialEntries.length} new entries. Updated ${updatedEntries.length} existing entries.`,
    inserted: newFinansialEntries,
    updated: updatedEntries,
  });
};

export const sortingFinansialController = async (req, res) => {
  const order = req.query.order === "DESC" ? "DESC" : "ASC";
  console.log(order);

  try {
    const response = await sortingFinansial(order);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const searchFinansialController = async (req, res) => {
  const { item } = req.query;
  console.log(item);
  
  try {
    const response = await searchFinansial(item);
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
