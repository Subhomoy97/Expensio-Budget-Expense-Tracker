const { join, resolve } = require("path");
const express = require("express");
const morgan = require("morgan");
const cron = require("node-cron");
const dotenv = require("dotenv");
const cors = require("cors");
const ejs=require('ejs')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('connect-flash');
dotenv.config();

const sendMailUnverifiedUsers = require("./app/helper/sendMailUnverifiedUser"); 
const path = require("path");

const app = express();

cron.schedule('0 */12 * * *', async () => {
  console.log("⏱️ Running 12-hour reminder for unverified users...");
  await sendMailUnverifiedUsers();
});

const namedRouter = require("route-label")(app);
app.use(
  cors({
    // origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 60000,
  },
  secret: process.env.JWT_SECRECT || "X7k9#Lz@W2",
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.successMessage = req.flash('success');
    res.locals.errorMessage = req.flash('error');
    next();
});

//templeteing engine ejs setup
app.set('view engine','ejs');
app.set('views','views')

app.use(express.static(__dirname +'/public'))      
/******************** Import Configuration and Custome Modules *******************/
const appConfig = require(resolve(join(__dirname, "app/config", "index")));
// Import Utils Module
const utils = require(resolve(join(__dirname, "app/helper", "utils")));
/******************** Configuration Registration *******************/
const getPort = appConfig.appRoot.port; // get port number
const getHost = appConfig.appRoot.host; // get host
const isProduction = appConfig.appRoot.isProd;
const getApiFolderName = appConfig.appRoot.getApiFolderName;
const getUserFolderName = appConfig.appRoot.getUserFolderName;
const getAuthFolderName = appConfig.appRoot.getAuthFolderName;
const getAdminFolderName = appConfig.appRoot.getAdminFolderName;

// Global function to generate URLs for named routes
global.generateUrl = generateUrl = (routeName, routeParams = {}) => {
  // Generate the URL using the named route and parameters
  const url = namedRouter.urlFor(routeName, routeParams);
  // Return the generated URL
  // console.log(url); // for testing
  return url;
};

// Serving public folder statically
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 3000 })
);
// Get information from html forms

app.use(morgan("dev"));
app.use(express.static("uploads"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling function for the server
const onError = (error) => {
  // Retrieve the port that the server is trying to listen on
  const port = getPort;

  // Check if the error is related to the 'listen' system call,
  // which happens when the server attempts to bind to a port.
  if (error.syscall !== "listen") {
    // If it's not a 'listen' error, rethrow the error and handle it elsewhere
    throw error;
  }

  // Determine the type of binding:
  // If the port is a string, it's likely a named pipe; if it's a number, it's a network port.
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // Switch statement to handle specific error codes that may occur when listening on a port
  switch (error.code) {
    // Case when the process lacks permissions to bind to the specified port --> Access Denied
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      // Exit the process with an exit code of 1 (indicating an error)
      process.exit(1);
      break;

    // Case when the specified port or pipe is already in use by another process --> Port Already in Use
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      // Exit the process with an exit code of 0 (indicating normal termination)
      process.exit(0);
      break;

    // Default case: If the error code is something else, rethrow the error to be handled elsewhere
    default:
      throw error;
  }
};

(async () => {
  try {
    // Connect Database
    await require(resolve(join(__dirname, "app/config", "db")))();

    /*********************** Connect Routes **********************/
    // -------auth folder route-------

    const authFiles = await utils._readdir(`./app/router/${getAuthFolderName}`);

    authFiles.forEach((file) => {
      if (!file || file[0] == ".") return;
      namedRouter.use("/auth", require(join(__dirname, file)));
    });
    // -------api folder route-------

    const apiFiles = await utils._readdir(`./app/router/${getApiFolderName}`);

    apiFiles.forEach((file) => {
      if (!file || file[0] == ".") return;
      namedRouter.use("/api", require(join(__dirname, file)));
    });

    // -------user folder route-------

    const userFiles = await utils._readdir(`./app/router/${getUserFolderName}`);

    userFiles.forEach((file) => {
      if (!file || file[0] == ".") return;
      namedRouter.use("/user", require(join(__dirname, file)));
    });

    // -------admin folder route-------

    const adminFiles = await utils._readdir(`./app/router/${getAdminFolderName}`);

    adminFiles.forEach((file) => {
      if (!file || file[0] == ".") return;
      namedRouter.use("/admin", require(join(__dirname, file)));
    });

    // Building the Route Tables for debugging
    namedRouter.buildRouteTable();

    if (!isProduction && process.env.SHOW_NAMED_ROUTES === "true") {
      const apiRouteList = namedRouter.getRouteTable("/api");
      // const userRouteList = namedRouter.getRouteTable("/")

      // Show both route tables simultaneously
      console.log("Route Tables:");
      console.log("API Routes:", apiRouteList);
      // console.log("User Routes:", userRouteList);
    }

    // Set-up server
    app.listen(getPort);
    // Register the 'onError' function to listen for 'error' events on the 'app' object (likely an Express app or HTTP server)
    // When an error event is emitted, the 'onError' function will be called to handle it
    app.on("error", onError);

    console.log(`Project is running on http://${getHost}:${getPort}`);
  } catch (error) {
    console.log(error);
  }
})();
