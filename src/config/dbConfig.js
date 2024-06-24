const mongoose = require("mongoose");
const dotenv = require("dotenv");

// env vars setup
dotenv.config();
const { MONGO_URI } = process.env;
if (!MONGO_URI) {
  console.error("MONGO_URI environment variable is missing!");
  process.exit(1);
}
const dbConnect = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Established connection to Database.");
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
};
dbConnect();
const clientPromise = () => {
  return mongoose.connection.getClient();
};

module.exports = { clientPromise };
