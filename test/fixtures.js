import { ObjectId } from "mongodb";

export const maggie = {
  _id: new ObjectId(),
  firstName: "Maggie",
  lastName: "Simpson",
  email: "maggie@simpson.com",
  password: "secret",
};

export const testUsers = [
  {
    _id: new ObjectId(),
    firstName: "Homer",
    lastName: "Simpson",
    email: "homer@simpson.com",
    password: "secret",
  },
  {
    _id: new ObjectId(),
    firstName: "Marge",
    lastName: "Simpson",
    email: "marge@simpson.com",
    password: "secret",
  },
  {
    _id: new ObjectId(),
    firstName: "Bart",
    lastName: "Simpson",
    email: "bart@simpson.com",
    password: "secret",
  },
];

export const hillwalk = {
  _id: new ObjectId(),
  title: "hillwalk",
  latitude: 52.25932,
  longitude: -7.11007,
  distance: "<1km",
  duration: "<1hr"
};

export const testLocations = [
  {
    _id: new ObjectId(),
    title: "hillwalk2",
    latitude: 52.25932,
    longitude: -7.11007,
    distance: "<1km",
    duration: "<1hr"
  },
  {
    _id: new ObjectId(),
    title: "hillwalk3",
    latitude: 52.25932,
    longitude: -7.11007,
    distance: "<1km",
    duration: "<1hr"
  },
  {
    _id: new ObjectId(),
    title: "hillwalk4",
    latitude: 52.25932,
    longitude: -7.11007,
    distance: "<1km",
    duration: "<1hr"
  }
];

export const sampleDetail = {
  title: "Glending",
  postcode: "null",
  latitude: 52.25932,
  longitude: -7.11007,
  distance: "<1km",
  duration: "<1hr",
  locationId: hillwalk._id,
  isSetLocation: true
};

export const testDetails = [
  {
    title: "Avon",
    postcode: "W91HFX3",
    latitude: 52.25932,
    longitude: -7.11007,
    distance: "3-5km",
    duration: "<1hr",
    locationId: testLocations[0]._id,
    isSetLocation: true
  },
  {
    title: "Russelstown",
    postcode: null,
    latitude: 52.25932,
    longitude: -7.11007,
    distance: "<1km",
    duration: "<1hr",
    locationId: testLocations[1]._id,
    isSetLocation: true
  },
  {
    title: "Russborough",
    postcode: null,
    latitude: 52.25932,
    longitude: -7.11007,
    distance: "<1km",
    duration: "<1hr",
    locationId: testLocations[2]._id,
    isSetLocation: true
  }
];

export const sampleReview = {
  user: new ObjectId(), 
  locationId: "60d5f2c6d2a3b00b8c8c9c9c",
  title: "Great Walk!",
  content: "I really enjoyed this walk. The scenery was beautiful, and it was a refreshing experience.",
  rating: 5,
  date: new Date()
};

export const testReviews = [
  {
    user: new ObjectId("664b8c8d7c0a9f45c82d04c2"), 
    locationId: "60d5f2c6d2a3b00b8c8c9c9c",
    title: "Amazing Experience",
    content: "This was one of the best walks I've ever been on. The trail is well-maintained and the views are spectacular.",
    rating: 5,
    date: new Date()
  },
  {
    user: new ObjectId("664b8c8d7c0a9f45c82d04c3"),
    locationId: "60d5f2c6d2a3b00b8c8c9c9d",
    title: "Peaceful and Relaxing",
    content: "I loved the tranquility of this place. It's perfect for a weekend getaway.",
    rating: 4,
    date: new Date()
  },
  {
    user: new ObjectId("664b8c8d7c0a9f45c82d04c4"), 
    locationId: "60d5f2c6d2a3b00b8c8c9c9e",
    title: "Fun for the Whole Family",
    content: "Great walk for families. The kids had a blast and we enjoyed the scenic route.",
    rating: 5,
    date: new Date()
  }
];

