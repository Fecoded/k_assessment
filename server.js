const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./config/db");

//Connect DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

const weather = require("./routes/weather.route");

const app = express();

// Load Config
dotenv.config({ path: "./config/.env" });

// Parse Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Register Routes
app.use("/api/v1/weather", weather);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server started on ${process.env.NODE_ENV} mode on port ${PORT}`)
);
