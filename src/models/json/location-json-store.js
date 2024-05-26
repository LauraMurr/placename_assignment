import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { detailsJsonStore } from "./details-json-store.js";

export const locationJsonStore = {
  async getAllLocations() {
    await db.read();
    return db.data.locations;
  },

  async addLocation(location) {
    await db.read();
    location._id = v4();
    // imclude image for new location and default image if no image added
    location.imagePath = location.imagePath || 'images/default.jpg';
    // locations added are user-created by default
    location.isSetLocation = location.isSetLocation || false;
    console.log(`Adding new location:`, location);
    db.data.locations.push(location);
    await db.write();
    console.log(`Location ${location._id} added successfully.`);
    return location;
  },

  async getLocationById(id) {
    await db.read();
    let list = db.data.locations.find((location) => location._id === id);
    if (list) {
        list.details = await detailsJsonStore.getDetailsByLocationId(list._id);
    } else {
        list = null;
    }
    return list;
  },

  async getSetLocations() {
    await db.read();
    //return db.data.locations.filter(location => location.isSetLocation === true);
    const locations = db.data.locations.filter(location => location.isSetLocation);
    console.log('Set locations:', locations);
    return locations;
  },

  async getUserLocations(userid) {
    await db.read();
    return db.data.locations.filter((location) => location.userid === userid);
  },

  async deleteLocationById(id) {
    await db.read();
    const index = db.data.locations.findIndex((location) => location._id === id);
    if (index !== -1) db.data.locations.splice(index, 1);
    await db.write();
  },

  async deleteAllLocations() {
    db.data.locations = [];
    await db.write();
  },

  // update a location or image
  async updateLocation(locationId, updatedLocation) {
    await db.read();
    const index = db.data.locations.findIndex((location) => location._id === locationId);
    if (index !== -1) {
      db.data.locations[index] = {
        ...db.data.locations[index],
        ...updatedLocation,
        _id: locationId // Ensure the ID remains unchanged
      };
      await db.write();
    }
  },

  // link user with set location
  async addUserLocation(userId, locationId) {
    await db.read();
    console.log(`Checking if location ${locationId} exists for linking with user ${userId}.`);

    // check if location exists
    const locationExists = db.data.locations.some(location => location._id === locationId);
    if (!locationExists) {
      console.error(`Location ${locationId} does not exist.`);
      throw new Error('Location does not exist.');
    }
    // initialise userLocations
    db.data.userLocations = db.data.userLocations || [];

    // check if user has this location on their list
      const userHasLocation = db.data.userLocations.some(ul => ul.userId === userId && ul.locationId === locationId);
      if (userHasLocation) {
        console.log(`User ${userId} already has location ${locationId}. No action needed.`);
        // Add a new user-location association
      } else {
          console.log(`Linking location ${locationId} with user ${userId}.`);
          db.data.userLocations.push({
            _id: v4(), // form a uniqe user/location id
            userId: userId,
            locationId: locationId
          });    
          await db.write();
          console.log(`Location ${locationId} linked with user ${userId}.`);
      }
    },

    async getSetLocationsByUser(userId) {
      await db.read();
      // filter locations by using userLocations userId
      const userLocationIds = db.data.userLocations.filter(ul => ul.userId === userId).map(ul => ul.locationId);
      const selectedSetLocations = db.data.locations.filter(location => userLocationIds.includes(location._id) && location.isSetLocation === true);
      return selectedSetLocations;
    }

  
  
};
