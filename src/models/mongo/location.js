 import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: String,
    content: String,
    rating: Number,
    date: { type: Date, default: Date.now }
})

const locationSchema = new Schema({
    title: { type: String, required: true },
    userid: { type: Schema.Types.ObjectId, ref: "User" },
    imagePath: { type: String, default: 'images/default.jpg' },
    isSetLocation: { type: Boolean, default: false },
    description: { type: String },  
    latitude: { type: Number, required: true },  
    longitude: { type: Number, required: true },
    distance: { type: String, required: true },  
    duration: { type: String, required: true },  
    postcode: { type: String },  
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
