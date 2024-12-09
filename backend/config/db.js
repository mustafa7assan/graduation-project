const mongoose = require("mongoose");

const ConnectDB = async () => {
  const uri = "mongodb://localhost:27017/marid";
  try {
    await mongoose.connect(uri);
    console.log("Connected to Database");
  } catch (error) {
    console.error("Faild to connect to Database: ", error.message);
    process.exit(1);
  }
};

module.exports = { ConnectDB };
