const express = require("express");
const connectDB = require("./config/db");
const app = express();

const authRoute = require("./routers/router");
const DB_URI = `mongodb://127.0.0.1/paytrust_app`;
app.use(express.json());
app.use(authRoute);

const start = async () => {
  try {
    await connectDB(DB_URI);
    app.listen(8000, () => {
      console.log("app is working at port 2000");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
