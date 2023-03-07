require("dotenv").config();

const { PORT } = process.env;

const getConnection = require("./db/mongoose");
const app = require("./app");

app.listen(PORT || 3000, async () => {
  await getConnection();
  console.log(`Server running. Use our API on port: ${PORT}`);
});
