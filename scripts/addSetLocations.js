import mongoose from 'mongoose';
import { Location } from '../src/models/mongo/location.js'; 


const mongoConnectionString = 'mongodb://localhost:27017/placename_assignment';  

async function addLocations() {
    try {
        await mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected successfully.');

        // Define the location data
        const locations = [
            new Location({
                title: 'Glending Walk',
                imagePath: 'images/Forest1.jpg',
                locationId: "ff68ff1d-b227-4693-8c32-d1ce4633c1b2",
                postcode: "W91G2F3",
                latitude: 52.25932,
                longitude: -7.11007,
                distance: "<1km",
                duration: "<1hr",
                isSetLocation: true,
                description: 'A serene escape into nature, just outside of Blessington. Good parking but get there early as it fills up during busy periods.'
            }),
            new Location({
                title: "Avon",
                imagePath: "images/Forest2.jpg",
                locationId: "41070df4-e05d-4dec-b492-23d7486dfea6",
                postcode: "W91HFX3",
                latitude: 52.25932,
                longitude: -7.11007,
                distance: "3-5km",
                duration: "<1hr",
                isSetLocation: true,
                description: "Nestled by the lakeside, Avon offers picturesque views and diverse trails. Limited parking spots available, carpooling advised."
            }),
            new Location({
                title: "Russelstown",
                imagePath: "images/Forest4.jpg",
                locationId: "7f7a3c0c-e589-42f9-9fb1-ea5f39159797",
                postcode: "W91K3X8",
                latitude: 52.25932,
                longitude: -7.11007,
                distance: "<1km",
                duration: "<1hr",
                isSetLocation: true,
                description: "Russelstown’s woodland trails are perfect for quick escapes. Adequate parking except on public holidays."
              }),
              new Location({
                title: "Russborough",
                imagePath: "images/Forest3.jpg",
                locationId: "7f7a3c0c-e589-42f9-9fb1-ea5f39159797",
                postcode: "W91R8F2",
                latitude: 52.25932,
                longitude: -7.11007,
                distance: "<1km",
                duration: "<1hr",
                isSetLocation: true,
                description: "Explore historic landscapes and extensive gardens. Parking is plentiful, ensuring easy access year-round."
              })
        ];

        // Save each location to the database
        for (const location of locations) {
            await location.save();
            console.log(`Location saved: ${location.title}`);
        }
        console.log('All locations added successfully.');
    } catch (error) {
        console.error('Error connecting to MongoDB or saving data:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected.');
    }
}

addLocations();
