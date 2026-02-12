const mongoose = require("mongoose");
require("dotenv").config();

async function runTest() {
  try {
    // 1️⃣ Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // 2️⃣ Define schema
    const travelPostSchema = new mongoose.Schema({
      title: String,
      content: String,
    });

    const TravelPost = mongoose.model("TravelPost", travelPostSchema);

    // 3️⃣ Clean slate (VERY IMPORTANT)
    await TravelPost.collection.drop().catch(() => {});
    console.log("Collection dropped");

    // 4️⃣ Insert EXACTLY two documents
    await TravelPost.insertMany([
      {
        title: "A Weekend in New York",
        content: "This post talks about a lovely trip to Paris and London.",
      },
      {
        title: "Paris: The City of Lights",
        content: "A complete guide to the best food.",
      },
    ]);

    console.log("Documents inserted");

    // 5️ Create WEIGHTED text index
    await TravelPost.collection.createIndex(
      { title: "text", content: "text" },
      {
        weights: { title: 5, content: 1 },
        name: "WeightedTextIndex",
      }
    );

    console.log("Weighted text index created");

    // 6️ Perform text search with relevance scoring
    const results = await TravelPost.find(
        { $text: { $search: "Paris" } },
        { title: 1, score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } })
    .lean(); // ✅ IMPORTANT



    // 7️⃣ Output result (TITLE + SCORE)
    console.log("\nSearch Results:");
    results.forEach((doc) => {
      console.log(`Title: ${doc.title}, Score: ${doc.score}`);
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
}

runTest();
