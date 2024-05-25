// import { func } from "joi";
import { db } from "../models/db.js";
import { LocationSpec } from "../models/joi-schemas.js";
import { DetailSpec } from "../models/joi-schemas.js";


export const locationController = {
  index: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const viewData = {
        title: "Location Dashboard",
        location: location,
      };
      return h.view("location-view", viewData);
    },
  },

  addDetailsView: { // handler for rendering the add-details-view
    handler: async function (request, h) {
      const locationId = request.params.id;

      try {
        const location = await db.locationStore.getLocationById(locationId);
        if (!location) {
          return h.view("error", {
            title: "Location Not Found",
            error: 'Location not found.',
            isAuthenticated: request.auth.isAuthenticated
          }).code(404);
        }

        const viewData = {
          title: "Add Details",
          location: location,
          isAuthenticated: request.auth.isAuthenticated,
        };

        return h.view("add-details-view", viewData);
      } catch (error) {
        console.error('Error fetching location:', error);
        return h.view("error", {
          title: "Error",
          error: 'An error occurred while fetching the location.',
          isAuthenticated: request.auth.isAuthenticated
        }).code(500);
      }
    },
  },

  addLocationDetails: {
    validate: {
      payload: DetailSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("location-view", { title: "Adding Details error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      console.log(request.payload);

      // Define eircode REGEX
      const eircodeRegex = /([AC-FHKNPRTV-Y]\d{2}|D6W)[0-9AC-FHKNPRTV-Y]{4}/;

      const { value, error } = DetailSpec.validate(request.payload);
      if (error) {
        return h.redirect(`/location-form?error=${encodeURIComponent(error.details[0].message)}`);
      }

      const locationId = request.params.id;
      const newDetail = {
        title: request.payload.title,
        postcode: value.postcode ? value.postcode.toUpperCase() : null, 
        latitude: value.latitude,
        longitude: value.longitude,
        distance: request.payload.distance,
        duration: request.payload.duration,
      };

     if (newDetail.postcode && !eircodeRegex.test(newDetail.postcode)) {
      return h.redirect(`/location-form?error=invalidpostcode`);
    }

      await db.detailStore.addDetail(locationId, newDetail);
      return h.redirect(`/location/${locationId}/locationdetails`);
    },
  },

  locationDetails: { // for authenticated users
    handler: async function (request, h) {
      const locationId = request.params.id;
      
      try {
        const location = await db.locationStore.getLocationById(locationId);
        if (!location) {
          // If no location is found, return a 404 response
          console.log('Location not found', locationId);
          return h.view("error", {
            title: "Location Not Found",
            error: 'Location not found.',
            isAuthenticated: request.auth.isAuthenticated
          }).code(404);
        }
    // Fetch details for the location
      const details = await db.detailStore.getDetailsByLocationId(locationId);
      console.log('Fetched detials for location: ', details); 

      const viewData = {
        title: "Details",
        location: location,
        details: details,
        isAuthenticated: request.auth.isAuthenticated,
      };
  
      return h.view("location-details", viewData);
    } catch (error) {
      // Handle any other errors that might occur during fetching from the database
      console.error('Error fetching location or details:', error);
      return h.view("error", {
        title: "Error",
        error: 'An error occurred while fetching the location details.',
        isAuthenticated: request.auth.isAuthenticated
      }).code(500);
    }
   },
  },

  publicLocationDetails: { // for public access to locations
    auth: false, 
    handler: async function (request, h) {
      const locationId = request.params.id;
      try {
        const location = await db.locationStore.getLocationById(locationId);
        if (!location) {
          console.log('Location not found:', locationId);
          return h.view("error", {
            title: "Location Not Found",
            error: 'Location not found.',
            isAuthenticated: request.auth.isAuthenticated
          }).code(404);
        }
        // Fetch details for the given location
        const details = await db.detailStore.getDetailsByLocationId(locationId);
        console.log('Fetched details for location:', details);
        
        const viewData = {
          title: "Details",
          location: location,
          details: details,
          isAuthenticated: request.auth.isAuthenticated,
        };

        return h.view("public-location-details", viewData);
      } catch (error) {
        console.error('Error fetching location or details:', error);
        return h.view("error", {
          title: "Error",
          error: 'An error occurred while fetching the location details.',
          isAuthenticated: request.auth.isAuthenticated
        }).code(500);
      }
    }, 
  },

  addDetailsForm: {
    handler: async function (request, h) {
      const locationId = request.params.id; 
      const location = await db.locationStore.getLocationById(locationId);
      if (!location) {
        return h.redirect('/dashboard').takeover();
      }
      const viewData = {
        title: "Add Location Details",
        location: location,
      };
      return h.view("add-details", viewData);
    },
  },

  deleteDetail: {
    handler: async function(request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.detailStore.deleteDetail(request.params.detailid);
      return h.redirect(`/location/${location._id}`);
    },
  },

};