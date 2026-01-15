import mongoose from "mongoose";

const foodMenuSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    hostelType: {
      type: String,
      required: true,
      trim: true,
    },
    foodType: {
      type: String,
      required: true,
      trim: true,
    },
    mealType: {
      type: String,
      enum: ["breakfast", "lunch","snacks", "dinner"],
      required: true,
    },
    foodItems: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("FoodMenu", foodMenuSchema);
