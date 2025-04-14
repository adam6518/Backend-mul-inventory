import { pool } from "../config/db.js";

const dataUsersQuery =  `CREATE TABLE IF NOT EXISTS data_users (
    iddata_users INT AUTO_INCREMENT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nama VARCHAR(45) NOT NULL,
    username VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    role VARCHAR(45) NOT NULL
)`   

const createTable = async(tableName, query) => {
    try {
        await pool.query(query);
        console.log(`${tableName} table already exists`);
    } catch(error) {
        console.log(`error creating the ${tableName}`, error);
        
    }
}

const createAllTable = async() => {
    try {
        await createTable('data_users', dataUsersQuery);
        console.log('All tables created');
        
    } catch(error) {
        console.log('error creating tables', error);
        
        throw error
    }
}

export default createAllTable