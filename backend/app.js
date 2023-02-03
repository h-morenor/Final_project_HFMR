require("dotenv").config();

const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");

const userRoutes = require("./routes/User");
const groupRoutes = require("./routes/Group")
//const resourceRoutes = require("./routes/Resource");
const imageRoutes = require("./routes/Groups")
// Crearting the express app
const app = express();


///////////////////// for the images
//////////////////////

/*

bodyParser = require('body-parser');
const imageRoutes = require('./routes/Groups')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use('/public', express.static('public'));


/*
app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});*/

/*
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
*/

////////////////////// for the images
/////////////////////



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
app.use('/api', imageRoutes)



//MongoDB Configuration

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`listening for request on port ${process.env.PORT}`);
});

