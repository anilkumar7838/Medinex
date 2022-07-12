const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    name:{
        type:String,
        maxLength: [40,"Name cannot exceed 40 character"],
        minLength: [2,"Name should have minimum 2 or more character"],
        required:true,
    },
    company:{
        type:String,
        required:true,
        maxLength: [40,"Name cannot exceed 40 character"],
        minLength: [2,"Name should have minimum 2 or more character"]
    },
    doe:{
        type:String,
        required:[true, "Please Enter Your Password"], 
    },
    
    createdAt:{
        type:Date,
        default:Date.now,
    },
});



module.exports=mongoose.model("Medicines",medicineSchema);