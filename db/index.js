const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://umarBhai:umarBhai@cluster0.ulq1q.mongodb.net/NewDatabaseName?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connected successfully to NewDatabaseName");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

module.exports = connectDb;
