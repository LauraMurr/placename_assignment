import { Location } from "./location.js";
import mongoose from 'mongoose';


export const locationMongoStore = {
  async getAllLocations() {
    const locations = await Location.find().lean();
    return locations;
  },

  async getLocationById(id) {
    const location = await Location.findById(id).lean();
    return location;
  },

  async getSetLocations() {
    const setLocations = await Location.find({ isSetLocation: true }).lean();
    return setLocations;
  },

  async getSetLocationsByUser(userId) {
    // const setLocations = await Location.find({ userid: userId, isSetLocation: true }).lean();
    // return setLocations;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid user ID");
      return null;
    }
    return await Location.find({ userid: userId, isSetLocation: true }).lean();
  },

  async addLocation(location) {
    const newLocation = new Location(location);
    await newLocation.save();
    return this.getLocationById(newLocation._id);
  },

  async getUserLocations(userId) {
    const locations = await Location.find({ userid: userId }).lean();
    return locations;
  },

  async deleteLocationById(id) {
    await Location.deleteOne({ _id: id });
  },

  async deleteAllLocations() {
    await Location.deleteMany({});
  },

  async updateLocation(id, updatedLocation) {
    const location = await Location.findByIdAndUpdate(id, updatedLocation, { new: true }).lean();
    return location;
  },
};
