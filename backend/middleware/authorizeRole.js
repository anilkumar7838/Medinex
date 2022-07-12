const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./CatchAsyncError")
const jwt = require("jsonwebtoken");
const User = require("../models/userModel/userSchema");

exports.authorizeUser = catchAsyncError(async (req,res,next) => {
    // console.log(req.headers.authorization);
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        if(!token){
            return next(new ErrorHandler("Please Login to access this resource",401));
        }
    
        const decodedData = jwt.verify(token,process.env.JWT_SECRET);
        if(decodedData){
            req.user = await User.findById(decodedData.id);
            // console.log(req.user);
    
            next();
        }
        else{
            res.status(401).json({
                success:false,
                message:"User not found"
            })
        }
    }
    else{
        res.status(401).json({
            success:false,
            message:"Unauthorized"
        });
    }
});