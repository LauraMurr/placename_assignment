import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const locations = await db.locationStore.getAllLocations();
      const viewData = {
        title: "Location Dashboard",
        locations: locations,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addLocation: {
    handler: async function (request, h) {
      const newLocation = {
        title: request.payload.title,
      };
      await db.locationStore.addLocation(newLocation);
      return h.redirect("/dashboard");
    },
  },
};
