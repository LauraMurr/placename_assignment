import { db } from "../models/db.js";
import { LocationSpec } from "../models/joi-schemas.js";


export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locations = await db.locationStore.getUserLocations(loggedInUser._id);
      const setLocations = await db.locationStore.getSetLocations(); 
      const viewData = {
        title: "Location Dashboard",
        user: loggedInUser,
        locations: locations,
        setLocations: setLocations,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addLocation: {
    validate: {
      payload: LocationSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Location Error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newLocation = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      const location = await db.locationStore.addLocation(newLocation);
      return h.redirect(`/location/${location._id}/add-details`);
    },
  },

  deleteLocation: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.locationStore.deleteLocationById(location._id);
      return h.redirect("/dashboard");
    },
  },

  selectLocation: {
    // allow a user to select a set location 
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locationId = request.payload.locationId;
       // return h.redirect(`/location-details/${locationId}`);
      try {
        await db.locationStore.addUserLocation(loggedInUser._id, locationId);
        return h.redirect("/dashboard");
      } catch (error) {
        console.error('Error linking location to user:', error);
        return h.redirect("/dashboard?error=linkingFailed");
      }
     
    },
  },
    
};
