import { pool } from "../config/db.js";

const dataUsersQuery = `CREATE TABLE IF NOT EXISTS data_users (
    iddata_users INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nama VARCHAR(45) NOT NULL,
    username VARCHAR(45) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(45) NOT NULL
)`;

const dataProjectQuery = `CREATE TABLE IF NOT EXISTS data_project (
        iddata_project INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        nama_project VARCHAR(255) NOT NULL,
        no_si VARCHAR(255) NOT NULL,
        nilai_project BIGINT(20) NOT NULL,
        status VARCHAR(255) NOT NULL,
        tahapan VARCHAR(255) NOT NULL
    )`;

const orderQuery = `CREATE TABLE IF NOT EXISTS data_order (
        iddata_order INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        item_pekerjaan VARCHAR(255) NOT NULL,
        nama_project VARCHAR(255) NOT NULL,
        volume_bq INT NOT NULL,
        qty_reject INT NOT NULL,
        qty_order INT NOT NULL,
        tanggal_checklist DATE NOT NULL,
        tahapan VARCHAR(255) NOT NULL 
)`;

const riwayatQuery = `CREATE TABLE IF NOT EXISTS riwayat (
        idriwayat INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        item_ordered VARCHAR(255) NOT NULL,
        lokasi_penanaman VARCHAR(255) NOT NULL,
        qty_ordered VARCHAR(255) NOT NULL,
        tanggal_order DATE NOT NULL
)`;

const finansialQuery = `CREATE TABLE IF NOT EXISTS finansial (
        idfinansial INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        nama_project VARCHAR(255) NOT NULL,
        pendapatan BIGINT(20) NOT NULL,
        modal_awal BIGINT(20) NOT NULL,
        profit BIGINT(20) NOT NULL
)`;

const createTable = async (tableName, query) => {
  try {
    await pool.query(query);
    console.log(`${tableName} table already exists`);
  } catch (error) {
    console.log(`error creating the ${tableName}`, error);
  }
};

// const createAllTable = async () => {
//   try {
//     await createTable("data_users", dataUsersQuery);
//     console.log("All tables created");
//     await createTable("data_project", dataProjectQuery);
//     console.log("All tables created");
//     await createTable("data_order", orderQuery);
//     console.log("All tables created");
//     await createTable("riwayat", riwayatQuery);
//     console.log("All tables created");
//     await createTable("finansial", finansialQuery);
//     console.log("All tables created");
//   } catch (error) {
//     console.log("error creating tables", error);

//     throw error;
//   }
// };
const createAllTable = async () => {
  try {
    await createTable("data_users", dataUsersQuery);
    await createTable("data_project", dataProjectQuery);
    await createTable("data_order", orderQuery);
    await createTable("riwayat", riwayatQuery);
    await createTable("finansial", finansialQuery);

    console.log("✅ All tables created successfully");
  } catch (error) {
    console.error("❌ Error creating one or more tables:", error);
    throw error;
  }
};

export default createAllTable;
