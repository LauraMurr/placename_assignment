import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testLocations, sampleReview } from "./fixtures.js";
import { EventEmitter } from "events";

suite("Review Model Tests", () => {

  EventEmitter.setMaxListeners(25);

  setup(async () => {
    db.init("mongo");
    await db.locationStore.deleteAllLocations();
    for (let i = 0; i < testLocations.length; i += 1) {
        // adding locations which will be reviewed
        testLocations[i] = await db.locationStore.addLocation(testLocations[i]);
    }
  });

  test("add a review to a location", async () => {
    const locationId = testLocations[0]._id; // assuming _id is available
    const review = await db.reviewsStore.addReview(locationId, sampleReview);
    assert.isNotNull(review, "Review should be added");
    const updatedLocation = await db.locationStore.getLocationById(locationId);
    assert.equal(updatedLocation.reviews.length, 1, "Location should contain one review.");
  });

  test("retrieve reviews by location", async () => {
    const locationId = testLocations[0]._id;
    const reviews = await db.reviewsStore.getReviewsByLocation(locationId);
    assert.isArray(reviews, "Should return an array of reviews");
    assert.isNotEmpty(reviews, "Reviews array should not be empty");
  });

  test("update a review", async () => {
    const locationId = testLocations[0]._id;
    const reviewId = testLocations[0].reviews[0]._id; // assuming reviews have been added
    const updatedContent = { title: "Updated Review", content: "This is updated content." };
    const result = await db.reviewsStore.updateReview(locationId, reviewId, updatedContent);
    assert.isTrue(result.modifiedCount > 0, "Update operation should be successful");
  });

  test("delete a review", async () => {
    const locationId = testLocations[0]._id;
    const reviewId = testLocations[0].reviews[0]._id;
    await db.reviewsStore.deleteReview(locationId, reviewId);
    const updatedLocation = await db.locationStore.getLocationById(locationId);
    assert.equal(updatedLocation.reviews.length, 0, "Review should be deleted from the location");
  });

  teardown(async () => {
    await db.locationStore.deleteAllLocations();
  });
});
