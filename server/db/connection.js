const mongoose = require("mongoose");

const connectDb = (con) => {
  return mongoose
    .connect(con)
    .then(() => {
      console.log("connection Successfull!!!!!!!!!!!!!");
    })
    .catch((err) => {
      console.log("Database error", err);
    });
};


module.exports = connectDb;