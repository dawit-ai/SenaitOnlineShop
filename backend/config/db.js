
import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost", // ⬅️ 1. Check if MySQL is running on localhost
  user: "root",      // ⬅️ 2. Check the user
  password: "",      // ⬅️ 3. Check the password (usually blank for local root)
  database: "senait_household_shop", // ⬅️ 4. Check the database name (case-sensitive)
});

db.connect((err) => {
  if (err) {
      console.log("DB connection error:", err); 
  }
  else console.log("Connected to MySQL database");
});

export default db;