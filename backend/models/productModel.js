import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Erstellt automatisch `createdAt` und `updatedAt`
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
