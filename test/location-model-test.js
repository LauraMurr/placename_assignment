import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testLocations, hillwalk } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";
import { EventEmitter } from "events"

suite("Location Model tests", () => {

  EventEmitter.setMaxListeners(25);

  setup(async () => {
    db.init("mongo");
    await db.locationStore.deleteAllLocations();
    for (let i = 0; i < testLocations.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        testLocations[i] = await db.locationStore.addLocation(testLocations[i]);
    }
  });

  test("create a location", async () => {
    const location = await db.locationStore.addLocation(hillwalk);
    assertSubset(location, hillwalk);
    assert.isDefined(location._id);
  });

  test("delete all locations", async () => {
    let returnedLocations = await db.locationStore.getAllLocations();
    assert.equal(returnedLocations.length, testLocations.length);
    await db.locationStore.deleteAllLocations();
    returnedLocations = await db.locationStore.getAllLocations();
    assert.equal(returnedLocations.length, 0);
  });

  test("get a location - success", async () => {
    const location = await db.locationStore.addLocation(hillwalk);
    const returnedLocation = await db.locationStore.getLocationById(location._id);
    assertSubset(hillwalk, location);
  });

  test("delete One Location - success", async () => {
    const id = testLocations[0]._id;
    await db.locationStore.deleteLocationById(id);
    const returnedLocations = await db.locationStore.getAllLocations();
    assert.equal(returnedLocations.length, testLocations.length - 1);
    const deletedLocation = await db.locationStore.getLocationById(id);
    assert.isNull(deletedLocation);
  });

  test("get a location - bad params", async () => {
    assert.isNull(await db.locationStore.getLocationById(""));
    assert.isNull(await db.locationStore.getLocationById(undefined));
  });

  test("delete One Location - fail", async () => {
    await db.locationStore.deleteLocationById("bad-id");
    const allLocations = await db.locationStore.getAllLocations();
    assert.equal(testLocations.length, allLocations.length);
  });

  test("get set locations", async () => {
    // Adding a set location to the database
    const setLocations = {
      title: "Set Location",
      isSetLocation: true,
      imagePath: "images/set.jpg"
    };
    await db.locationStore.addLocation(setLocations);
  
    // Call the method that retrieves only set locations
    const retrievedLocations = await db.locationStore.getSetLocations();
  
    // Assert that the retrieved locations are indeed set
    assert.isTrue(retrievedLocations.every(loc => loc.isSetLocation), "All retrieved locations should be set locations.");
    assert.strictEqual(retrievedLocations.length, 1, "There should be exactly one set location retrieved.");
    assert.strictEqual(retrievedLocations[0].title, "Set Location", "The title of the retrieved location should match.");
  });
  
});
