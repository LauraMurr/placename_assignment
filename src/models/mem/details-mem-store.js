import { v4 } from "uuid";

let details = [];

export const detailsMemStore = {
  async getAllDetails() {
    return details;
  },

  async addDetail(locationId, detail) {
    detail._id = v4();
    detail.locationid = locationId;
    details.push(detail);
    return detail;
  },

  async getDetailsByLocationId(id) {
    return details.filter((detail) => detail.locationid === id);
  },

  async getDetailById(id) {
    return details.find((detail) => detail._id === id);
  },

  async getLocationDetails(locationId) {
    return details.filter((detail) => detail.locationid === locationId);
  },

  async deleteDetail(id) {
    const index = details.findIndex((detail) => detail._id === id);
    details.splice(index, 1);
  },

  async deleteAllDetails() {
    details = [];
  },

  async updateDetail(detail, updatedDetail) {
    detail.title = updatedDetail.title;
    detail.postcode = updatedDetail.postcode;
    detail.distance = updatedDetail.distance;
    detail.duration = updatedDetail.duration;
  },
};