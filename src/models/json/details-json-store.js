import { v4 } from "uuid";
import { db } from "./store-utils.js";


// Unified method to get details by location ID
async function getDetailsByLocationId(id) {
  await db.read();
  console.log('Database details:', db.data.details);
  const details = db.data.details.filter((detail) => detail.locationId === id);
  console.log('Fetched details for location id:', id, details);
  return details;
}

export const detailsJsonStore = {
  async getAllDetails() {
    await db.read();
    return db.data.details;
  },

  async addDetail(locationId, detail) {
    await db.read();
    detail._id = v4();
    detail.locationId = locationId;
    db.data.details.push(detail);
    await db.write();
    return detail;
  },

  async getDetailsByLocationId(id) {
    await db.read();
    console.log('Database details:', db.data.details);
    const details = db.data.details.filter((detail) => detail.locationId === id);
    console.log('Fetched details for location id:', id, details);
    return details;
    //return db.data.details.filter((detail) => detail.locationId === id);
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
    detail.latitude = updatedDetail.latitude;
    detail.longitude = updatedDetail.longitude;
    detail.distance = updatedDetail.distance;
    detail.duration = updatedDetail.duration;
   // detail.imagePath = updatedDetail.imagePath; 
    detail.isSetLocation = updatedDetail.isSetLocation;
    //detail.isPublic = updatedDetail.isPublic;
  },
};