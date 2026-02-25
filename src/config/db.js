const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.DB_HOST;

  if (!mongoUri) {
    console.error("❌ DB_HOST is missing");
    process.exit(1);
  }

  const poolSize = parseInt(process.env.DB_POOL_SIZE || "10", 10);

  try {
    await mongoose.connect(mongoUri, {
      maxPoolSize: poolSize,
    });

    console.log(`✅ MongoDB Connected | maxPoolSize = ${poolSize}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;