 import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
    title: { type: String, required: true },
    userid: { type: Schema.Types.ObjectId, ref: "User" },
    imagePath: { type: String, default: 'images/default.jpg' },
    isSetLocation: { type: Boolean, default: false }  
});

export const Location = Mongoose.model("Location", locationSchema); 

/*
import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
  title: String,
  imagePath: { type: String, default: "images/default.jpg" },
  isSetLocation: { type: Boolean, default: false }, // Initially false, set to true when approved by an admin
  user: { type: Schema.Types.ObjectId, ref: "User", default: null }, // Reference to User who added the location
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' } // Tracks the approval status
});

export const Location = Mongoose.model("Location", locationSchema); */
