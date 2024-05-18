import { Location } from "./location.js";
import mongoose from 'mongoose';


export const locationMongoStore = {
  async getAllLocations() {
    const locations = await Location.find().lean();
    return locations;
  },

  async getLocationById(id) {
    if (!id) return null;
    const location = await Location.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      { $lookup: {
          from: "details", 
          localField: "_id",
          foreignField: "locationId",
          as: "details"
        }
      }
    ]);
    return location[0] || null; 
  },

  async getSetLocations() {
    const setLocations = await Location.find({ isSetLocation: true }).lean();
    return setLocations;
  },


  async getSetLocationsByUser(userId) {
    await db.read();
    // filter locations by using userLocations userId
    const userLocationIds = db.data.userLocations.filter(ul => ul.userId === userId).map(ul => ul.locationId);
    const selectedSetLocations = db.data.locations.filter(location => userLocationIds.includes(location._id) && location.isSetLocation === true);
    return selectedSetLocations;
  },


  async addLocation(location) {
    const newLocation = new Location(location);
    const locationObj = await newLocation.save();
    return this.getLocationById(locationObj._id);
  },

  async getUserLocations(userId) {
    const locations = await Location.find({ user: userId }).lean();
    return locations;
  },

  async deleteLocationById(id) {
    try {
      await Location.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLocations() {
    await Location.deleteMany({});
  },

  async updateLocation(id, updatedLocation) {
    const location = await Location.findByIdAndUpdate(id, updatedLocation, { new: true }).lean();
    return location;
  },

};
