import Mongoose from "mongoose";

const { Schema } = Mongoose;

const detailSchema = new Schema({
  title: String,
  postcode: String,
  latitude: Number,
  longitude: Number,
  distance: String,
  duration: String,
});

export const Detail = Mongoose.model("Detail", detailSchema);
