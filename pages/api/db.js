import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'pyfb_db'
});

async function createDatabaseIfNotExists() {
  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS pyfb_db`);
    console.log("Database 'pyfb_db' created or already exists.");
  } catch (error) {
    console.error("Error creating database:", error);
  }
}

async function createTableIfNotExists() {
  const tableQuery = `
    CREATE TABLE IF NOT EXISTS table1 (
      id INT AUTO_INCREMENT PRIMARY KEY,
      column1 VARCHAR(255),
      column2 VARCHAR(255)
    )
  `;

  try {
    
    await connection.query(tableQuery);
    console.log("Table 'table1' created or already exists.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

async function initializeDatabase() {
  await createDatabaseIfNotExists();
  await connection.changeUser({database: 'pyfb_db'}); // Switch to the pyfb_db database
  await createTableIfNotExists();
}

initializeDatabase();

export default connection;
