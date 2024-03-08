import { v4 } from "uuid";

let locations = [];

export const locationMemStore = {
  async getAllLocations() {
    return locations;
  },

  async addLocation(location) {
    location._id = v4();
    locations.push(location);
    return location;
  },

  async getLocationById(id) {
    return locations.find((location) => location._id === id);
  },

  async deleteLocationById(id) {
    const index = locations.findIndex((location) => location._id === id);
    locations.splice(index, 1);
  },

  async deleteAllLocations() {
    locations = [];
  },
};