require("dotenv").config();

const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");

const userRoutes = require("./routes/User");
const groupRoutes = require("./routes/Group")
//const resourceRoutes = require("./routes/Resource");

// Crearting the express app
const app = express();


// Middlewares
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path);
  next();
});

//Registeered routes
app.use("/api/users", userRoutes)
//app.use("/api/resources", resourceRoutes);
app.use("/api/group",groupRoutes)

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`listening for request on port ${process.env.PORT}`);
});