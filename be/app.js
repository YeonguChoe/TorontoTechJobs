const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const dotenv = require("dotenv-safe");

const jobRoutes = require("./route/job");
const companyRoutes = require("./route/company");

app.use(cors());

app.use(express.json());
dotenv.config();
require("dotenv").config();

// MongoDB
const mongoURI =
    process.env.DATABASE_URI || "mongodb://localhost:27017/yourLocalDB";

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 20000,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB...", err));

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Mongoose connected to " + mongoURI);
});

db.on("error", (err) => {
    console.error("Mongoose connection error: " + err);
});

db.on("disconnected", () => {
    console.log("Mongoose disconnected");
});

app.use("/jobs", jobRoutes);
app.use("/companies", companyRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
