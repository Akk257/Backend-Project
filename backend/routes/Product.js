import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: {
         type: String, 
         required: true 
        },
    price: { 
        type: Number, 
        required: true 
    },
    category: { type: String, 
        required: true 
    },
    location: { 
        type: String 
    },
    image: { 
        type: String },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
