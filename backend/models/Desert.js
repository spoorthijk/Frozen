import mongoose from "mongoose";

const desertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    flavor: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
      // required: true,
    },
    size: {
      type: String,
      // required: true,
      enum: ["Small", "Medium", "Large"], // Ensuring valid sizes
    },
    description: {
      type: String,
      // required: true,
    },
    photo: {
      type: String,
      // required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    featured: {
      type: Boolean,
      // default: false,
    },
  },
  { timestamps: true, collection: 'desertbooking' }
);

export default mongoose.model("Desert", desertSchema);