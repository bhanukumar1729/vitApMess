import "dotenv/config";

import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "1.0.0.1"]); // keep this (important for Atlas)

import mongoose from "mongoose";
import fs from "fs";
import FoodMenu from "../models/foodMenu.js";

const importMenu = async () => {
  try {
    console.log("DBURL:", process.env.DBURL);

    // 1️⃣ Connect to MongoDB
    await mongoose.connect(process.env.DBURL);
    console.log("✅ MongoDB connected");

    // 2️⃣ Read new merged JSON
    const data = JSON.parse(
      fs.readFileSync(
        "./data/january_menu_2026_merged_with_meals.json",
        "utf-8"
      )
    );

    // 3️⃣ REMOVE OLD DATA
    const deleted = await FoodMenu.deleteMany({});
    console.log(`🗑️ Old records deleted: ${deleted.deletedCount}`);

    // 4️⃣ INSERT NEW DATA
    const inserted = await FoodMenu.insertMany(data);
    console.log(`✅ New records inserted: ${inserted.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Import failed:", error);
    process.exit(1);
  }
};

importMenu();
