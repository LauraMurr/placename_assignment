import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testDetails, sampleDetail } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";
import { EventEmitter } from "events";




suite("Detail Model tests", () => {

  EventEmitter.setMaxListeners(25);

  setup(async () => {
    db.init("mongo");
    await db.detailStore.deleteAllDetails();
    for (let i = 0; i < testDetails.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await db.detailStore.addDetail(testDetails[i].locationId, testDetails[i]);
    }
  });

  test("create a detail", async () => {
    const detail = await db.detailStore.addDetail(sampleDetail.locationId, sampleDetail);
    assertSubset(detail, sampleDetail);
    assert.isDefined(detail._id);
  });

  test("delete all details", async () => {
    let returnedDetails = await db.detailStore.getAllDetails();
    assert.equal(returnedDetails.length, testDetails.length);
    await db.detailStore.deleteAllDetails();
    returnedDetails = await db.detailStore.getAllDetails();
    assert.equal(returnedDetails.length, 0);
  });

  test("get a detail - success", async () => {
    const detail = await db.detailStore.addDetail(sampleDetail.locationId, sampleDetail);
    const returnedDetail = await db.detailStore.getDetailById(detail._id);
    assertSubset(sampleDetail, detail);
  });

  test("delete one detail - success", async () => {
    const allDetailsBefore = await db.detailStore.getAllDetails();
    console.log("Details before deletion:", allDetailsBefore);

    const id = allDetailsBefore[0]._id; // Use an existing ID from the database
    await db.detailStore.deleteDetail(id);
    
    const returnedDetails = await db.detailStore.getAllDetails();
    console.log("Details after deletion:", returnedDetails);

    assert.equal(returnedDetails.length, testDetails.length - 1);
    
    const deletedDetail = await db.detailStore.getDetailById(id);
    assert.isNull(deletedDetail);
  });

  test("get a detail - bad params", async () => {
    assert.isNull(await db.detailStore.getDetailById(""));
    assert.isNull(await db.detailStore.getDetailById("invalid-id"));
  });
  
  test("delete one detail - fail", async () => {
    await db.detailStore.deleteDetail("invalid-id");
    const allDetails = await db.detailStore.getAllDetails();
    assert.equal(testDetails.length, allDetails.length);
  });
  
});
