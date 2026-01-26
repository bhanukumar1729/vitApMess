import mongoose from "mongoose";

const foodMenuSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    hostelType: { type: [String], required: true },
    foodType: {
      type: String,
      enum: ["veg", "non veg", "special"],
      required: true
    },
    meals: {
      breakfast: [String],
      lunch: [String],
      snacks: [String],
      dinner: [String]
    }
  },
  { timestamps: true }
);


export default mongoose.model("FoodMenu", foodMenuSchema);
