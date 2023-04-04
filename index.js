const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const mainSchema = require("./model");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(
    "mongodb+srv://nikhil:mGDrAWf6zhhiTcRy@quadb.2nie5bl.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((isConnected) => {
    console.log("connected");
    mainSchema.deleteMany({});
  })
  .catch((err) => {
    console.log(err);
  });

const arr = [];
axios.get("https://api.wazirx.com/api/v2/tickers").then((data) => {
  const mainData = Object.entries(data.data);

  for (let index = 0; index < mainData.length; index++) {
    arr.push({ name: mainData[index][0], ...mainData[index][1] });
  }
});

if (arr.length > 0) {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    const saveData = new mainSchema({
      name: element.name,
      last: element.last,
      base_unit: element.base_unit,
      buy_sell_price: `₹ ${element.buy} / ₹ ${element.last}`,
      volume: element.volume,
    });

    saveData.save();
  }
}

app.get("/data", async (req, res) => {
  const data = await mainSchema.find({});
  res.status(200).send(data);
});

app.listen(3001, () => {
  console.log("App running on 3001");
});
