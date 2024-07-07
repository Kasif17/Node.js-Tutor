const mongoose = require("mongoose");

const connectToMongoDB = async (uri) => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Mongodb connected");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1);
  }
};

module.exports = { connectToMongoDB };
