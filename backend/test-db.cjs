(async () => {
  try {
    // correct path to config/db.js
    const { default: db } = await import("./config/db.js");

    const [rows] = await db.query("SELECT 1");
    console.log("✅ Database connected successfully!");
    console.log(rows);

    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection failed");
    console.error(error);
    process.exit(1);
  }
})();
