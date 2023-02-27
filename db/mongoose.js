const mongoose = require("mongoose");
const { getConnectionURI } = require("./utils");

async function getConnection() {
  mongoose.set("strictQuery", false);

  const uri = getConnectionURI();
  // console.log(uri);
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
}

module.exports = getConnection;
