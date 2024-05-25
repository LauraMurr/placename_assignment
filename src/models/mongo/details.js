import Mongoose from "mongoose";



const { Schema } = Mongoose;

const detailSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  locationid: { type: Schema.Types.ObjectId, ref: "Location", required: true },
  postcode: { type: String, default: '' },
  latitude: { type: Number, min: -90, max: 90, required: function() { return this.postcode === ''; } },
  longitude: { type: Number, min: -180, max: 180, required: function() { return this.postcode === ''; } },
  distance: { type: String, enum: ['<1km', '1-3km', '3-5km', '5-8km', '8-10km', '10-13km', '13-15km', '>15km'], required: true },
  duration: { type: String, enum: ['<1hr', '1-2hrs', '2-3hrs', '3-4hrs', '4-5hrs', '5-6hrs', '>6hrs'], required: true }
});

export const Detail = Mongoose.model("Detail", detailSchema);
