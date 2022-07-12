const ErrorHandler =require("../utils/errorHandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const Medicine=require("../models/MedicineModel/medicineSchema");
const sendEmail=require("../utils/sendEmail")

//------- Add Medicine -----------
exports.AddMedicine = catchAsyncError(async(req,res,next)=>{

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
exports.getMedicine = catchAsyncError(async(req,res,next)=>{

    const med =await Medicine.find();

    res.status(200).json({
        success:true,
        med,
    })
});

