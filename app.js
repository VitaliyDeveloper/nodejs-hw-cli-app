const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const routerApi = require("./routes/api");
const auth = require("./middlewaries/auth");
const contacts = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contacts);
app.use("/api/auth", routerApi.auth);
app.use("/api/users", auth, routerApi.users);

app.use((req, res) => {
  res.status(404).json({ code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ code: 500, message: err.message });
});

module.exports = app;
