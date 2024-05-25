import { db } from "../models/db.js";
// import { LocationSpec } from "../models/joi-schemas.js";

// Controller to manage the home page which publicly displays the locations

export const homeController = {
    index: {
        handler: async function (request, h) {
            try {
                const setLocations = await db.locationStore.getSetLocations();
                return h.view("main", {
                    title: "Welcome to West Wicklow Walks",
                    setLocations: setLocations, 
                    isAuthenticated: request.auth.isAuthenticated
                });
            } catch (error) {
                console.error('Error fetching locations:', error);
                return h.view("main", {
                    title: "Welcome to West Wicklow Walks",
                    error: 'Could not load locations. Please try again later.',
                    isAuthenticated: request.auth.isAuthenticated
                });
            }
        },
        
        auth: false,
    },
};
