const express = require("express");
const ErrorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const webpush = require("web-push");
const cron = require("node-cron");
const app = express();
const User = require("./models/userModel/userSchema");
const ErrorHandler = require("./utils/errorHandler");

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

// Subscribe Route
app.post("/subscribe", async (req, res,next) => {
  // Get pushSubscription object
  try {
    const newUserData = {
      subscription: req.body,
    };


    console.log("inside subscribe");
    console.log(req.body);
    // creating new Schema for Subscribe

    // user.id not defined
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    // For First User
    getExpireMedicine();
    
    // Send 201 - resource created
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// scheduler
let task = cron.schedule("*/10 * * * * *", () => {
  console.log("minute...");
  getExpireMedicine();
});

// stop task till development........
setTimeout(() => {
  task.stop();
}, 11000);

let getExpireMedicine = catchAsyncError(async () => {
  var date = new Date();
  var formattedDate = moment(date).format("YYYY-MM-DD");
  let med = await Medicine.find({ doe: String(formattedDate) });
  let str = "Today Expired Medicines are: \n";
  for (var i = 0; i < med.length; i++) {
    str = str + `${med[i].name} manufactured by ${med[i].company} \n`;
  }

  //Email
  const user = await User.find();
  
  for (var curr = 0; curr < user.length; curr++) {
    try {
      let subs = user[curr].subscription;
      if (subs) {
        // Pass object into sendNotification
        const payload = JSON.stringify({ title: "Medinex", body: String(str) });

        webpush
          .sendNotification(subs, payload)
          .catch((err) => console.error(err));
      }
      // console.log(user[curr].email);
      await sendEmail({
        reciever: user[curr].email,
        subject: `Medinex`,
        message: str,
      });
      res.status(200).json({
        success: true,
        message: `Email sent successfully`,
      });
    } catch (error) {
      return new ErrorHandler(error.message, 500);
    }
  }
});

// ----- Middleware Error Handling---
app.use(ErrorMiddleware);

module.exports = app;
