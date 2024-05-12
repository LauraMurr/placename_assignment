import { db } from "../models/db.js";
import { LocationSpec } from "../models/joi-schemas.js";


export const dashboardController = {
  //Display dashboard with all locations associated with user
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locations = await db.locationStore.getUserLocations(loggedInUser._id);
      const setLocations = await db.locationStore.getSetLocations();
      const selectedSetLocations = await db.locationStore.getSetLocationsByUser(loggedInUser._id);
      const combinedLocations = [...locations, ...selectedSetLocations];
      const viewData = {
        title: "Location Dashboard",
        user: loggedInUser,
        locations: combinedLocations,
        setLocations: setLocations,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  // Handler for add location form submission
  addLocation: {
    validate: {
      payload: LocationSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Location Error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const newLocation = {
          userid: loggedInUser._id,
          title: request.payload.title,
        };
        const location = await db.locationStore.addLocation(newLocation);

        if (!location || !location._id) {
          console.error('Failed to add new location:', newLocation);
          return h.view("dashboard-view", { title: "Error Adding Location", error: 'Unexpected error occurred. Please try again.' });
        }
        
        return h.redirect(`/dashboard`);
      } catch (error) {
        console.error('Error adding new location:', error);
        
        return h.view("dashboard-view", { title: "Error Adding Location", error: 'Unexpected error occurred. Please try again.' });
      }
    },
  },

  deleteLocation: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.locationStore.deleteLocationById(location._id);
      return h.redirect(`/dashboard`);
    },
  },

  selectLocation: {
    // allow a user to select a set location and add it to their list
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locationId = request.payload.locationId;
      try {
        await db.locationStore.addUserLocation(loggedInUser._id, locationId);
        return h.redirect(`/dashboard`);
      } catch (error) {
        console.error('Error linking location to user:', error);
        return h.redirect("/dashboard?error=linkingFailed");
      }
     
    },
  },
    
};
