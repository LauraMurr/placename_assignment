import { Location } from "./location.js";
import mongoose from 'mongoose';

/* export const reviewsMongoStore = {
  async addReview(locationId, review) {
    review.user = userId;  
    review.locationId = locationId;  
    try {
      const location = await Location.findById(locationId);
      if (!location) throw new Error("Location not found");

      location.reviews.push(review);
      await location.save();
      return review;
    } catch (error) {
      console.error("Error adding review:", error);
      return null;
    }
  }, */
  export const reviewsMongoStore = {
    async addReview(locationId, review) {
      if (!mongoose.Types.ObjectId.isValid(locationId)) {
        return null;
      }
      const newReview = { ...review, _id: new mongoose.Types.ObjectId() };
      return await Location.findByIdAndUpdate(
        locationId,
        { $push: { reviews: newReview } },
        { new: true, useFindAndModify: false }
      );
    },

  /* async getReviewsByLocation(locationId) {
    try {
      const location = await Location.findById(locationId).populate("reviews.user").lean();
      return location ? location.reviews : [];
    } catch (error) {
      console.error("Error fetching reviews for location:", error);
      return [];
    }
  }, */
  async getReviewsByLocation(locationId) {
    if (!mongoose.Types.ObjectId.isValid(locationId)) {
      return null;
    }
    const location = await Location.findById(locationId).lean();
    return location ? location.reviews : null;
  },
  /*
  async updateReview(locationId, reviewId, updatedReview) {
    try {
      const location = await Location.findOneAndUpdate(
        { "_id": locationId, "reviews._id": reviewId },
        { "$set": { "reviews.$": updatedReview } },
        { new: true }
      );
      return location ? location.reviews.id(reviewId) : null;
    } catch (error) {
      console.error("Error updating review:", error);
      return null;
    }
  }, */
  async updateReview(locationId, reviewId, updatedReview) {
    if (!mongoose.Types.ObjectId.isValid(locationId) || !mongoose.Types.ObjectId.isValid(reviewId)) {
      return null;
    }
    return await Location.updateOne(
      { "_id": locationId, "reviews._id": reviewId },
      { "$set": { "reviews.$": updatedReview } }
    );
  },
  /*
  async deleteReview(locationId, reviewId) {
    try {
      const location = await Location.findById(locationId);
      if (!location) throw new Error("Location not found");

      location.reviews.id(reviewId).remove();
      await location.save();
      return true;
    } catch (error) {
      console.error("Error deleting review:", error);
      return false;
    }
  } */
  async deleteReview(locationId, reviewId) {
    if (!mongoose.Types.ObjectId.isValid(locationId) || !mongoose.Types.ObjectId.isValid(reviewId)) {
      return null;
    }
    return await Location.updateOne(
      { _id: locationId },
      { $pull: { reviews: { _id: reviewId } } }
    );
  },
};

export default reviewsMongoStore;

