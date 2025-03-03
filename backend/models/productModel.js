import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
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
    category: {
      type: String,
      required: true,
    },

    image: {
      type: String
    }, // Bild-URL oder Dateispeicherung mit Multer
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }, // Verknüpfung mit Benutzer
  },
  {
    timestamps: true, // Erstellt automatisch `createdAt` und `updatedAt`
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
