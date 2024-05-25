import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testLocations, sampleReview, testReviews, testUsers } from "./fixtures.js";
import { EventEmitter } from "events";


suite("Review Model Tests", () => {
  EventEmitter.setMaxListeners(25);

  setup(async () => {
    db.init("mongo");
    await db.userStore.deleteAll();
    await db.locationStore.deleteAllLocations();
    
    // Adding users which will write reviews
    for (let i = 0; i < testUsers.length; i += 1) {
      testUsers[i] = await db.userStore.addUser(testUsers[i]);
    }

    // Adding locations which will be reviewed
    for (let i = 0; i < testLocations.length; i += 1) {
      testLocations[i] = await db.locationStore.addLocation(testLocations[i]);
    }
  });


  test("add a review to a location", async () => {
    const locationId = testLocations[0]._id;
    const review = { ...sampleReview, user: testUsers[0]._id };
    const addedReview = await db.reviewStore.addReview(locationId, review);
    assert.isNotNull(addedReview, "Review should be added");
    const updatedLocation = await db.locationStore.getLocationById(locationId);
    assert.equal(updatedLocation.reviews.length, 1, "Location should contain one review.");
  });

  test("retrieve reviews by location", async () => {
    const locationId = testLocations[0]._id;
    const review = { ...sampleReview, user: testUsers[0]._id };
    await db.reviewStore.addReview(locationId, review);
    const reviews = await db.reviewStore.getReviewsByLocation(locationId);
    assert.isArray(reviews, "Should return an array of reviews");
    assert.isNotEmpty(reviews, "Reviews array should not be empty");
  });

  test("retrieve reviews by location", async () => {
    const locationId = testLocations[0]._id;
    const review = { ...sampleReview, user: testUsers[0]._id };
    await db.reviewStore.addReview(locationId, review);
    const reviews = await db.reviewStore.getReviewsByLocation(locationId);
    assert.isArray(reviews, "Should return an array of reviews");
    assert.isNotEmpty(reviews, "Reviews array should not be empty");
  });

  /* test("update a review", async () => {
    const locationId = testLocations[0]._id;
    const review = { ...sampleReview, user: testUsers[0]._id };
    const addedReview = await db.reviewStore.addReview(locationId, review);
    const reviewId = addedReview.reviews[0]._id;
    const updatedContent = { title: "Updated Review", content: "This is updated content." };
    const result = await db.reviewStore.updateReview(locationId, reviewId, updatedContent);
    assert.isTrue(result.modifiedCount > 0, "Update operation should be successful");
    const updatedReviews = await db.reviewStore.getReviewsByLocation(locationId);
    const updatedReview = updatedReviews.find(r => r._id.toString() === reviewId.toString());
    assert.strictEqual(updatedReview.title, updatedContent.title);
    assert.strictEqual(updatedReview.content, updatedContent.content);
  }); */

  test("delete a review", async () => {
    const locationId = testLocations[0]._id;
    const review = { ...sampleReview, user: testUsers[0]._id };
    const addedReview = await db.reviewStore.addReview(locationId, review);
    const reviewId = addedReview.reviews[0]._id;
    await db.reviewStore.deleteReview(locationId, reviewId);
    const updatedLocation = await db.locationStore.getLocationById(locationId);
    assert.equal(updatedLocation.reviews.length, 0, "Review should be deleted from the location");
  });

  teardown(async () => {
    await db.locationStore.deleteAllLocations();
    await db.userStore.deleteAll();
  });
});

