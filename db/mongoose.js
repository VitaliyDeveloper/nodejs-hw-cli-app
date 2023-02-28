const mongoose = require("mongoose");
const { getConnectionURI } = require("./utils");

async function getConnection() {
  mongoose.set("strictQuery", false);

  const uri = getConnectionURI();
  // console.log(uri);
  return mongoose.connect(uri);
}

module.exports = getConnection;
