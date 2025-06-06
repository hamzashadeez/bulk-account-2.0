import mongoose, { Schema, model } from "mongoose";

// Define the product schema
const productSchema = new Schema({
  platform: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    default: 1
  },
  followers: {
    type: Number,
    required: true,
  },
  following: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models['Product'] || mongoose.model('Product', productSchema);