import { Detail } from "./details.js";
import Mongoose from 'mongoose';

export const detailsMongoStore = {
  async getAllDetails() {
    return await Detail.find().lean();
  },

  async addDetail(locationId, detailData) {
    if (!Mongoose.Types.ObjectId.isValid(locationId)) {
      return null; 
    }
    const detail = new Detail({ ...detailData, locationId });
    return await detail.save();
  },

  async getDetailsByLocationId(locationId) {
    if (!Mongoose.Types.ObjectId.isValid(locationId)) {
      return null;
    }
    return await Detail.find({ locationId }).lean();
  },

  async getDetailById(id) {
    if (!Mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Detail.findById(id).lean();
  },

  async deleteDetail(id) {
    if (!Mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Detail.findByIdAndDelete(id);
  },

  async deleteAllDetails() {
    return await Detail.deleteMany({});
  },

  async updateDetail(id, updatedDetail) {
    if (!Mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Detail.findByIdAndUpdate(id, updatedDetail, { new: true }).lean();
  },
};


