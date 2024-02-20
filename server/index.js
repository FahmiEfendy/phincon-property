const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

const userRoute = require("./server/api/user");
const houseRoute = require("./server/api/house");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/house", houseRoute);

app.get("/api", (req, res) => {
  res.send("Hello!");
});

app.listen(port, () => {
  console.log(`Successfully connected to port ${port}`);
});
