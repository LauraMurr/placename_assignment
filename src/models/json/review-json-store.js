import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const reviewJsonStore = {
  async getAllReviews() {
    await db.read();
    return db.data.reviews;
  },

  async addReview(locationId, review) {
    await db.read();
    review._id = v4();
    review.userId = userId;
    review.locationid = locationId;
    db.data.reviews.push(review);
    await db.write();
    return review;
  },

  async getReviewsByLocationId(locationId) {
    await db.read();
    return db.data.reviews.filter((review) => review.locationid === locationId);
  },

  async deleteReview(reviewId) {
    await db.read();
    const index = db.data.reviews.findIndex((review) => review._id === reviewId);
    if (index !== -1) {
      db.data.reviews.splice(index, 1);
      await db.write();
    }
  },

  async deleteAllReviews() {
    db.data.reviews = [];
    await db.write();
  },
};
