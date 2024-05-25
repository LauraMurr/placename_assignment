import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from '@hapi/inert';
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import Cookie from "@hapi/cookie";
import { accountsController } from "./controllers/accounts-controller.js";
import dotenv from "dotenv";
import Joi from "joi";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.register(Vision);
  await server.register(Inert);
  await server.register(Cookie);
  server.validator(Joi);

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "placename_assignment",
      password: "secretpasswordnotrevealedtoanyone",
      isSecure: false,
    },
    redirectTo: "/login",
    validate: accountsController.validate,
  });
    server.auth.default("session");

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, 'public'),
        listing: false,
        index: false,
      },
    },
    options: {
      auth: false,
    }
  });

  const result = dotenv.config();
  if (result.error) {
    console.log(result.error.message);
    process.exit(1);
  }
  
  db.init("json");
  server.route(webRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
  };

  process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
  });

init();