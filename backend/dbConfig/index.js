const mongoose = require('mongoose');
require("dotenv").config();


exports.dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => {
      console.log("DB connection faild!");
      console.error(err);
      process.exit(1);
    });
};
