 import Mongoose from "mongoose";
// import reviewSchema from "./reviews.js";

const { Schema } = Mongoose;

const locationSchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    userid: { type: Schema.Types.ObjectId, ref: "User" },
    imagePath: { type: String, default: 'images/default.jpg' },
    isSetLocation: { type: Boolean, default: true },
    description: { type: String }
    //description: { type: String },  
    //latitude: { type: Number, required: true },  
    //longitude: { type: Number, required: true },
    //distance: { type: String, required: true },  
    //duration: { type: String, required: true },  
    //postcode: { type: String },
    // reviews: [reviewSchema]  
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
