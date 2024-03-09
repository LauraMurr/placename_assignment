import { db } from "../models/db.js";

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
    handler: async function (request, h) {
      // Define eircode REGEX
      const eircodeRegex = /([AC-FHKNPRTV-Y]\d{2}|D6W)[0-9AC-FHKNPRTV-Y]{4}/;

      const locationId = request.params.locationId;
      const newDetail = {
        title: request.payload.title,
        postcode: request.payload.postcode.toUpperCase(),
        distance: request.payload.distance,
        duration: request.payload.duration,
      };
      if (!eircodeRegex.test(newDetail.postcode)) {
        return h.redirect("/location-form?error=invalidpostcode");
      }
      await db.detailStore.addDetail(locationId, newDetail);
      return h.redirect(`/location/${locationId}/locationdetails`);
    },
  },

  locationDetails: {
    handler: async function (request, h) {
      const locationId = request.params.locationId || request.params.id;
      const location = await db.locationStore.getLocationById(locationId);
      const details = await db.detailStore.getDetailsByLocationId(locationId);

      return h.view("location-details", {
        title: "Location Details",
        location: location,
        details: details,
      });
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