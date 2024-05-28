import { db } from "../models/db.js";
import { ReviewSpec } from "../models/joi-schemas.js";

export const reviewController = {
  addReview: {
    validate: {
      payload: ReviewSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        const locationId = request.params.id;
        return h.view("location-details", { title: "Add Review Error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        console.log("Logged in user:", loggedInUser);
        const locationId = request.params.id;
        const newReview = {
          userId: loggedInUser._id,
          locationId: locationId,
          reviewTitle: request.payload.reviewTitle,
          stars: request.payload.stars,
          text: request.payload.text,
          date: new Date().toISOString(),
        };
        await db.reviewStore.addReview(loggedInUser._id, locationId, newReview); 
        return h.redirect(`/location/${locationId}/locationdetails`);
      } catch (error) {
        console.error('Error adding review:', error);
        return h.view("location-details", { title: "Error Adding Review", error: 'Unexpected error occurred. Please try again.' });
      }
    },
  },

  getReviews: {
    handler: async function (request, h) {
      const locationId = request.params.id;
      const reviews = await db.reviewStore.getReviewsByLocationId(locationId); 

      // // Fetch and include user's name in each review
      for (let review of reviews) {
        const user = await db.userStore.getUserById(review.userId);
        review.user = `${user.firstName} ${user.lastName}`;
        console.log(`User: ${review.user}, Review ID: ${review._id}`);

        // Format date 
        review.date = new Date(review.date).toLocaleDateString();
      }
      return h.response(reviews);
    },
  },
};

