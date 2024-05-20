import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    locationId: { type: Schema.Types.ObjectId, ref: "Location", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now }
});

export default reviewSchema;  
