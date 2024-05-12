import { db } from "../models/db.js";
import { UserSpec, } from "../models/joi-schemas.js";

// Controller to manage user accounts: session validation, login, signup, logout


export const accountsController = {

  // Display the sign up form
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up" });
    },
  },
  
  // Signup handler to process sign up requests using Joi to validate against 'UserSpec' schema
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
  
  // Display the login view
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to your account" });
    },
  },

  // Handler to process user login requests
  login: {
    auth: false,
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      // If the credentials are incorrect, it redirects to the login page with an error
      if (!user || user.password !== password) {
        request.log(['error', 'login'], `Failed login atttempt for email: ${email}`);
        return h.redirect("/login?error=invalidcredentials");
      }
      // If correct, it sets up a session for the user and redirects to the dashboard
      request.cookieAuth.set({ id: user._id });
      console.log('Session set for user:', user);
      return h.redirect("/dashboard");
    },
  },

  // Logs out the user
  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  // Function to validate the session 
  validate: async function (request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};


