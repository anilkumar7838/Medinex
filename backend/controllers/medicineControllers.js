const ErrorHandler =require("../utils/errorHandler");
const CatchAsyncError=require("../middleware/CatchAsyncError");
const Medicine=require("../models/MedicineModel/medicineSchema");
const sendEmail=require("../utils/sendEmail")

//------- Add Medicine -----------
exports.AddMedicine = CatchAsyncError(async(req,res,next)=>{

    const {name,company,doe}=req.body;

    const med=await Medicine.create({
        name,
        company,
        doe,
    });
    res.status(200).json({
        success:true,
        med,
        message:"Medicine added Successfully",
    })
});

//------- Get Medicine -----------
exports.getMedicine = CatchAsyncError(async(req,res,next)=>{

    const med =await Medicine.find();

    res.status(200).json({
        success:true,
        med,
    })
});

