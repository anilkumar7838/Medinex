const express = require("express");
const ErrorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const webpush = require("web-push");
const cron = require("node-cron");
const app = express();

//
const moment = require("moment");
const catchAsyncError = require("./middleware/catchAsyncError");
const Medicine = require("./models/MedicineModel/medicineSchema");

//

// -----for Json to pass as argument----
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     // res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

// -----Route Import------
const userRoute = require("./routes/UserRoute");
const medRoute = require("./routes/MedicineRoute");

// -----Routes-----(v1-> version1)
app.use("/v1", userRoute);
app.use("/v1", medRoute);

//---- config ----
require("dotenv").config({ path: "./config/config.env" });

const publicVapidKey = process.env.PUBLICVAPIDKEY;
const privateVapidKey = process.env.PRIVATEVAPIDKEY;

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// scheduler
let task = cron.schedule("* * * * * *", () => {
  getExpireMedicine();
});

// setTimeout(() => {
//   task.stop();
// }, 1002);

let getExpireMedicine = catchAsyncError(async () => {
  var date = new Date();
  var formattedDate = moment(date).format("YYYY-MM-DD");
  let med = await Medicine.find({ doe: String(formattedDate) });
  // Subscribe Route
  app.post("/subscribe", (req, res) => {
      if (med.length != 0) {
      // Get pushSubscription object
      const subscription = req.body;

      // Send 201 - resource created
      res.status(201).json({});
      let str = "Today Expired Medicines are: \n"; 
      for(var i=0;i<med.length;i++){
          str= str+`${med[i].name} manufactured by ${med[i].company} \n`;
      }
      const payload = JSON.stringify({ title: "Medinex",body: String(str)});
      // Pass object into sendNotification
      webpush
        .sendNotification(subscription, payload)
        .catch((err) => console.error(err));
      } else {
        return null;
      }
    });
});

// ----- Middleware Error Handling---
app.use(ErrorMiddleware);

module.exports = app;
