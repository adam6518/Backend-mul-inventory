import { pool } from "../config/db.js";

export const addProject = async (project) => {
  try {
    const query = `INSERT INTO data_project (nama_project, no_si, nilai_project, status, tahapan) VALUES (?, ?, ?, ?, ?)`;
    const values = [
      project.namaProject,
      project.nomorSi,
      project.nilaiProjectRaw,
      project.statusProject,
      project.tahapanProject,
    ];
    await pool.query(query, values);
    return { success: true, message: "Project added successfully" };
  } catch (error) {
    return { success: false, message: "Failed to add project", error: error };
  }
};

export const getAllProject = async () => {
  try {
    const query = `SELECT * FROM data_project`;
    const [rows] = await pool.query(query);
    return {
      success: true,
      message: "Success get all data project",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get all data project",
      error: error,
    };
  }
};

export const deleteDataProject = async (projectId) => {
  try {
    const query = `DELETE FROM data_project WHERE iddata_project = ?`;
    await pool.query(query, [projectId]);
    return { success: true, message: "Success delete data project" };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete data project",
      error: error,
    };
  }
};

export const searchProject = async (namaProject) => {
  try {
    const query = `SELECT * FROM data_project WHERE nama_project LIKE ?`;
    const [rows] = await pool.query(query, [`%${namaProject}%`]);
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

export const updateProject = async (project) => {
  try {
    const query = `
        UPDATE data_project 
        SET nama_project = ?, no_si = ?, nilai_project = ?, status = ?, tahapan = ?
        WHERE iddata_project = ?
      `;
    const values = [
      project.nama_project,
      project.no_si,
      project.nilai_project,
      project.status,
      project.tahapan,
      project.iddata_project,
    ];
    await pool.query(query, values);
    return { success: true, message: "Project updated successfully" };
  } catch (error) {
    return { success: false, message: "Failed to update project", error };
  }
};
