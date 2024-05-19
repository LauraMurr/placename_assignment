import { Location } from "./location.js"; 
import { User } from "./user.js";

export const reviewsMongoStore = {
    async addReview(locationId, userId, review) {
      review.user = userId;  // Assigning the user ID to the review
      try {
        return await Location.updateOne(
          { _id: locationId },
          { $push: { reviews: review } }
        );
      } catch (error) {
        console.error("Error adding review:", error);
      }
    },

  async getReviewsByLocation(locationId) {
    try {
      const location = await Location.findById(locationId).select("reviews").lean();
      return location ? location.reviews : null;
    } catch (error) {
      console.error("Error fetching reviews for location:", error);
      return null;
    }
  },

  async updateReview(locationId, reviewId, updatedReview) {
    try {
      return await Location.updateOne(
        { "_id": locationId, "reviews._id": reviewId },
        { "$set": { "reviews.$": updatedReview } }
      );
    } catch (error) {
      console.error("Error updating review:", error);
    }
  },

  async deleteReview(locationId, reviewId) {
    try {
      return await Location.updateOne(
        { _id: locationId },
        { $pull: { reviews: { _id: reviewId } } }
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  }
};

export default reviewsMongoStore;
