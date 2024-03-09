import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const detailsJsonStore = {
  async getAllDetails() {
    await db.read();
    return db.data.details;
  },

  async addDetail(locationId, detail) {
    await db.read();
    detail._id = v4();
    detail.locationid = locationId;
    db.data.details.push(detail);
    await db.write();
    return detail;
  },

  async getDetailsByLocationId(id) {
    await db.read();
    return db.data.details.filter((detail) => detail.locationid === id);
  },

  async getDetailById(id) {
    await db.read();
    return db.data.details.find((detail) => detail._id === id);
  },

  async deleteDetail(id) {
    await db.read();
    const index = db.data.details.findIndex((detail) => detail._id === id);
    db.data.details.splice(index, 1);
    await db.write();
  },

  async deleteAllDetails() {
    db.data.details = [];
    await db.write();
  },

  async updateDetail(detail, updatedDetail) {
    detail.title = updatedDetail.title;
    detail.postcode = updatedDetail.postcode;
    detail.distance = updatedDetail.distance;
    detail.duration = updatedDetail.duration;
  },
};