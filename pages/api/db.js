import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'pyfb_db'
});

async function createTableIfNotExists() {
  const tableQuery = `
    CREATE TABLE IF NOT EXISTS table1 (
      id INT AUTO_INCREMENT PRIMARY KEY,
      column1 VARCHAR(255),
      column2 VARCHAR(255)
    )
  `;

  await connection.query(tableQuery);
}

createTableIfNotExists();

export default connection;
