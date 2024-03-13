import { db } from "../models/db.js";
import { UserSpec, } from "../models/joi-schemas.js";
import { LocationSpec } from "../models/joi-schemas.js";


export const accountsController = {

  index: {
    auth: false,
    handler: async function (request, h) {
      console.log('Is Authenticated:', request.auth.isAuthenticated);
      console.log('Credentials:', request.auth.credentials);
      try {
        const setLocations = await db.locationStore.getSetLocations(); // Fetch all 'Set' locations
        return h.view("main", {
          title: "Welcome to West Wicklow Walks",
          setLocations: setLocations, // Set locations are publicaly available on the home page
          isAuthenticated: request.auth.isAuthenticated
        });
      } catch (error) {
        console.error('Error fetching locations:', error);
        // Error handling
        return h.view("main", {
          title: "Welcome to West Wicklow Walks",
          error: 'Could not load locations. Please try again later.',
          isAuthenticated: request.auth.isAuthenticated
        });
      }
    },
  },
  

  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up" });
    },
  },

  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      const existingUser = await db.userStore.getUserByEmail(user.email);
      // Error handling in case user has already signed up
      if (existingUser) {
        const errorMessage = `A user with the email address ${user.email} already exists.`;
        return h.view("signup-view", { title: "Sign up error", errors: [{ message: errorMessage }] }).takeover().code(400);
      }
      const newUser = await db.userStore.addUser(user);
      // automatically log new user in after they've signed up
      request.cookieAuth.set({ id: newUser._id });
      return h.redirect("dashboard");
    },
  },

  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to your account" });
    },
  },

  login: {
    auth: false,
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        request.log(['error', 'login'], `Failed login atttempt for email: ${email}`);
        return h.redirect("/login?error=invalidcredentials");
      }
      request.cookieAuth.set({ id: user._id });
      console.log('Session set for user:', request.auth.credentials);
      return h.redirect("/dashboard");
    },
  },

  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  validate: async function (request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};


