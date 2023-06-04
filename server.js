// Environment Variables
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const express = require("express");
const app = express();

// DB connection
const connectDB = require("./config/db");
connectDB(MONGO_URI);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api", require("./routes/api"));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
