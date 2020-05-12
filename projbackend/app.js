require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const app = express();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripPayment");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000
  })

  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(err => console.log(err.reason));

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
