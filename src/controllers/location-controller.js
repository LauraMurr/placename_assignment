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

  addLocation: {
    handler: async function (request, h){
      const newLocation = {
        title: request.payload.title,
      };
      const location = await db.locationStore.addLocation(newLocation);
      return h.redirect("/dashboard");
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

      const { value, error } = LocationSpec.validate(request.payload);
      if (error) {
        return h.redirect(`/location-form?error=${encodeURIComponent(error.details[0].message)}`);
      }

      const locationId = request.params.locationId;
      const newDetail = {
        title: request.payload.title,
        postcode: value.postcode ? value.postcode.toUpperCase() : null, 
        latitude: value.latitude,
        longitude: value.longitude,
        distance: request.payload.distance,
        duration: request.payload.duration,
      };

     if (newDetail.postcode && !eircodeRegex.test(newDetail.postcode)) {
      return h.redirect("/location-form?error=invalidpostcode");
    }

      await db.detailStore.addDetail(locationId, newDetail);
      return h.redirect(`/location/${locationId}/locationdetails`);
    },
  },

  locationDetails: {
    handler: async function (request, h) {
      const locationId = request.params.id; 
      const location = await db.locationStore.getLocationById(locationId);
      const details = await db.detailStore.getDetailsByLocationId(locationId); // Ensure this method exists in your details store
  
      const viewData = {
        title: "Location Details",
        location: location,
        details: details,
        isAuthenticated: request.auth.isAuthenticated,
      };
  
      return h.view("location-details", viewData);
    },
  },

  setLocationDetails: {
    handler: async function (request, h) {
      const locationId = request.params.id;
      const location = await db.locationStore.getLocationById(locationId);
      const details = await db.detailStore.getDetailsByLocationId(locationId);
  
      const viewData = {
        title: location.title + " Details",
        location,
        details
      };
  
      return h.view("set-details-view", viewData);
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