import orderModel from "../models/orderModels.js";
import {
  addOrder,
  getAllOrder,
  deleteDataOrder,
  searchOrder,
  updateOrder,
  deleteAllOrder,
} from "../services/orderServices.js";

export const addOrderController = async (req, res) => {
  const {
    itemPekerjaan,
    namaProject,
    volumeBq,
    qtyReject,
    qtyOrder,
    tanggalChecklist,
    tahapan,
  } = req.body;
  const numericVolBq = parseFloat(volumeBq);
  const numericQtyReject = parseFloat(qtyReject);
  const numericQtyOrder = parseFloat(qtyOrder);
  if (
    !itemPekerjaan ||
    !namaProject ||
    !numericVolBq ||
    !numericQtyOrder ||
    !numericQtyReject ||
    !tanggalChecklist ||
    !tahapan
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  const order = new orderModel({
    itemPekerjaan,
    namaProject,
    volumeBq: numericVolBq,
    qtyReject: numericQtyReject,
    qtyOrder: numericQtyOrder,
    tanggalChecklist,
    tahapan,
  });
  try {
    const response = await addOrder(order);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return { success: false, message: "failed to add order !!" };
  }
};

export const getAllDataOrderController = async (req, res) => {
  try {
    const response = await getAllOrder();
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
    return { success: false, message: "Failed to get data order" };
  }
};

export const deleteAllOrderController = async (req, res) => {
  try {
    const response = await deleteAllOrder();
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

export const deleteDataOrderController = async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);

  try {
    const response = await deleteDataOrder(orderId);
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

export const searchDataOrderController = async (req, res) => {
  const { itemPekerjaan } = req.query;
  console.log(itemPekerjaan);
  try {
    const response = await searchOrder(itemPekerjaan);
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

export const updateOrderController = async (req, res) => {
  const {
    iddata_order,
    item_pekerjaan,
    nama_project,
    volume_bq,
    qty_reject,
    qty_order,
    tanggal_checklist,
    tahapan,
  } = req.body;

  if (
    !iddata_order ||
    !item_pekerjaan ||
    !nama_project ||
    !volume_bq ||
    !qty_reject ||
    !qty_order ||
    !tanggal_checklist ||
    !tahapan
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const order = {
    iddata_order,
    item_pekerjaan,
    nama_project,
    volume_bq,
    qty_reject,
    qty_order,
    tanggal_checklist,
    tahapan,
  };
  try {
    const response = await updateOrder(order);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
