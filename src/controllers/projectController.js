import projectModel from "../models/projectModel.js";
import {
  addProject,
  deleteDataProject,
  getAllProject,
  searchProject,
  updateProject,
} from "../services/projectServices.js";

export const addProjectController = async (req, res) => {
  const {
    namaProject,
    nomorSi,
    nilaiProjectRaw,
    statusProject,
    tahapanProject,
  } = req.body;
  const numericNilaiProject = parseFloat(nilaiProjectRaw);
  if (
    !namaProject ||
    !nomorSi ||
    !numericNilaiProject ||
    !statusProject ||
    !tahapanProject
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  const project = new projectModel({
    namaProject,
    nomorSi,
    nilaiProjectRaw: numericNilaiProject,
    statusProject,
    tahapanProject,
  });
  try {
    const response = await addProject(project);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return { success: false, message: "failed to add project !!" };
  }
};

export const getAllDataProjectController = async (req, res) => {
  try {
    const response = await getAllProject();

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
    return { success: false, message: "Failed to get data project" };
  }
};

export const deleteDataProjectController = async (req, res) => {
  const { projectId } = req.params;
  console.log(projectId);

  try {
    const response = await deleteDataProject(projectId);
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

export const searchDataProjectController = async (req, res) => {
  const { namaProject } = req.query;
  try {
    const response = await searchProject(namaProject);
    if (response.success) {
      return res.status(200).json({
        success: true,
        message: response.message,
        data: response.data,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: response.message, data: [] });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProjectController = async (req, res) => {
  const {
    iddata_project,
    nama_project,
    no_si,
    nilai_project,
    status,
    tahapan,
  } = req.body;
  if (
    !iddata_project ||
    !nama_project ||
    !no_si ||
    !nilai_project ||
    !status ||
    !tahapan
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  const numericNilaiProject = parseFloat(nilai_project);
  if (isNaN(numericNilaiProject)) {
    return res.status(400).json({ message: "Invalid nilaiProjectRaw value" });
  }
  const project = {
    iddata_project,
    nama_project,
    no_si,
    nilai_project: numericNilaiProject,
    status,
    tahapan,
  };
  try {
    const response = await updateProject(project);

    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
