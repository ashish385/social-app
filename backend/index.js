const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./dbConfig/index");
const {cloudinaryConnect} = require("./dbConfig/cloudinary")
const authRoute = require("./routes/authRoutes");
const postRoute = require("./routes/postRoutes");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// // Load environment variables from .env file
dotenv.config();

// // Initialize Express application
const app = express();


const PORT = process.env.PORT || 8800;

// // Set security HTTP headers
app.use(helmet());

// // database connection
db.dbConnection();

// cloudinary connection
cloudinaryConnect();

// // Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);





// // Route handling
app.use("/api/auth", authRoute); // For authentication routes
app.use("/api/post", postRoute); // For post routes

// // def routes
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});


// ---------------------------Deployment-------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  // def routes
  app.get("/", (req, res) => {
    return res.json({
      success: true,
      message: "Your server is up and running....",
    });
  });
}
// ---------------------------Deployment-------------------------------

// // Start the server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
