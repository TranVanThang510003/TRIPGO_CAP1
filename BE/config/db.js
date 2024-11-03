// config/db.js

import dotenv from 'dotenv';
dotenv.config();
import sql from 'mssql';
const dbConfig = {
  // eslint-disable-next-line no-undef
  user: process.env.DB_USER,
  // eslint-disable-next-line no-undef
  password: process.env.DB_PASSWORD,
  // eslint-disable-next-line no-undef
  server: process.env.DB_SERVER,
  // eslint-disable-next-line no-undef
  database: process.env.DB_DATABASE,
  // eslint-disable-next-line no-undef
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: true, // Sử dụng mã hóa SSL nếu cần
    trustServerCertificate: true // Đối với chứng chỉ tự ký
  }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch(err => {
    console.error("Database connection failed: ", err);
    // eslint-disable-next-line no-undef
    process.exit(1);
  });

// eslint-disable-next-line no-undef
module.exports = {
  sql,
  poolPromise
};
