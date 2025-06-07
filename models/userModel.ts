import mongoose, { Schema, model } from "mongoose";

// Define the product schema
const userSchema = new Schema({
  accountNumber: {
    type: String,
    required: true,
  },

  bank: {
    type: String,
    required: true,
  },
  accountName: {
    type: Number,
    required: true,},
  phone: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
      
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models['User'] || mongoose.model('User', userSchema);