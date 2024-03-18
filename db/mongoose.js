require("dotenv").config();
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("database successfully connected "))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
