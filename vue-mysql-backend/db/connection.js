const mysql = require("mysql2/promise"); // Use promise-based connections
require("dotenv").config();

const db1 = mysql.createPool({
  host: process.env.DB1_HOST,
  user: process.env.DB1_USER,
  password: process.env.DB1_PASSWORD,
  database: process.env.DB1_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db2 = mysql.createPool({
  host: process.env.DB2_HOST,
  user: process.env.DB2_USER,
  password: process.env.DB2_PASSWORD,
  database: process.env.DB2_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test Connection
(async () => {
  try {
    const conn1 = await db1.getConnection();
    console.log("Connected to DB1!");
    conn1.release();

    const conn2 = await db2.getConnection();
    console.log("Connected to DB2!");
    conn2.release();
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
  }
})();

module.exports = { db1, db2 };
