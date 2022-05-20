const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const { planetsRouter, launchesRouter } = require("./routes");

const app = express();

// middleware (order matters)
app.use(cors({ origin: process.env.ALLOW_ORIGIN }));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// routes
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

// client side routing for production build
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
