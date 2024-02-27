
import { userMemStore } from "./mem/user-mem-store.js";
import { locationMemStore } from "./mem/location-mem-store.js";
import { detailsMemStore } from "./mem/details-mem-store.js"

export const db = {
  userStore: null,
  locationStore: null,

  init() {
    this.userStore = userMemStore;
    this.locationStore = locationMemStore;
  },
};
