import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// const pool = mysql2.createPool({
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   connectionLimit: 10,
//   queueLimit: 0,
//   waitForConnections: true,
// });
const pool = mysql2.createPool({
  host: process.env.DB_HOST_LOCAL,
  port: parseInt(process.env.DB_PORT_LOCAL),
  user: process.env.DB_USER_LOCAL,
  password: process.env.DB_PASS_LOCAL,
  database: process.env.DB_NAME_LOCAL,
  connectionLimit: 10,
  queueLimit: 0,
  waitForConnections: true,
});

const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connection established successfully");
    connection.release();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

export { pool, checkConnection };
