const express=require("express");
const {
    AddMedicine,
    getMedicine,
  } = require("../controllers/medicineControllers");
  
  const { authorizeUser } = require("../middleware/authorizeRole");
  const router = express.Router();

  router.route("/notify").get(authorizeUser,getMedicine);
  router.route("/medicines").post(authorizeUser,AddMedicine);
  
  module.exports = router;