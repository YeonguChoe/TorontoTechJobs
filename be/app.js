const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

const jobRoutes = require("./routes/jobs");
const userRoutes = require("./routes/users");

app.use(express.json());

// MongoDB
const mongoURI = "mongodb://localhost:27017/TorontoTechJobs";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
