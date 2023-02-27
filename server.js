require("dotenv").config();

const getConnection = require("./db/mongoose");
const app = require("./app");

app.listen(3000, async () => {
  await getConnection();
  console.log("Server running. Use our API on port: 3000");
});
