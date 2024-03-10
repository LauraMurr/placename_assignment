
// import { userMemStore } from "./mem/user-mem-store.js";
// import { locationMemStore } from "./mem/location-mem-store.js";
// import { detailsMemStore } from "./mem/details-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { imageJsonStore } from "./json/image-json-store.js";
import { reviewJsonStore } from "./json/review-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";
import { detailsJsonStore } from "./json/details-json-store.js";
import { userMemStore } from "./mem/user-mem-store.js";
import { locationMemStore } from "./mem/location-mem-store.js";
import { detailsMemStore } from "./mem/details-mem-store.js";


export const db = {
  userStore: null,
  imageStore: null,
  reviewStore: null,
  locationStore: null,
  detailStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.imageStore = imageJsonStore;
        this.reviewStore = reviewJsonStore;
        this.locationStore = locationJsonStore;
        this.detailStore = detailsJsonStore;
        break;
      default:
        this.userStore = userMemStore;
        this.locationStore = locationMemStore;
        this.detailStore = detailsMemStore;
    }
  },
};
