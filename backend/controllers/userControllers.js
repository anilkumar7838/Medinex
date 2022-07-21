const ErrorHandler =require("../utils/errorHandler");
const CatchAsyncError=require("../middleware/CatchAsyncError");
const User=require("../models/userModel/userSchema");
const sendToken = require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail");
const { getExpireMedicine } = require("../app");

//------- Register User -----------
exports.registerUser = CatchAsyncError(async(req,res,next)=>{

    const {firstname,lastname,email,password,phone,dob,gender,address,country,state,city}=req.body;
    // form-type not used now  
    
    const name=String(firstname+" "+lastname);
    console.log(name);
    const user=await User.create({
        email,
        name,
        password,
        phone,
        dob,
        gender,
        address,
        country,
        state,
        city
    });
    sendToken(user,201,res);
});

// ------- Login User --------
exports.loginUser = CatchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    // cheacking if user given Password and email both
    if(!email ||!password){
        return next(new ErrorHandler("Please Enter Email and Password",400));
    }

    const user=await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    

    sendToken(user,200,res);

})

// -------------- Logout User ---------------------
exports.logout = CatchAsyncError(async(req,res,next)=>{
    res.status(200).json({
        success:true,
        message:"Logged Out",
    })
})

// ------------- Forgot Password -----------------

exports.forgotPassword = CatchAsyncError(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    //Get ResetPassword Token
    const resetToken=user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`
    // const resetPasswordUrl = `${process.env.FRONTEND_URL}://${req.get("host")}/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it `;

    try{
        await sendEmail({
            email:user.email,
            subject:`Medinex Password Recovery`,
            message,
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        });

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire= undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500));
    }
})

// ------------ Reset Password ------------

exports.resetPassword = CatchAsyncError(async(req,res,next)=>{
    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.Token).digest("hex");

    const user= await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    })

    if(!user){
        return next(new ErrorHandler("Reset Password token is invalid or has been expired",400));
    }
    
    if(req.body.password!= req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password=req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire= undefined;

    await user.save();
    sendToken(user,200,res);
});


// ----------- Update User password ------------

exports.updatePassword = CatchAsyncError(async(req,res,next)=>{
    const user =await User.findById(req.user.id).select("+password");
    
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",400));
    }
    
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password = req.body.newPassword;
    
    await user.save();
    
    sendToken(user,200,res);
});

// ---------- Update User Profile ----------

exports.updateProfile = CatchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
    }
    
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{new:true,runValidators:true,useFindAndModify:false});
    
    res.status(200).json({
        success:true,
    })
})

// ----------- Get User Details ----------
exports.getUserDetails = CatchAsyncError(async(req,res,next)=>{
    const user =await User.findById(req.user.id);
    // console.log(user);
    res.status(200).json({
        success:true,
        user,
    });
});


// --------------- send Email ------------

exports.getReview =CatchAsyncError(async(req,res,next)=>{
    const review = req.body;
    const reviewMessage= `Name :- ${review.name} \nEmail:- ${review.email}\nMessage:- ${review.message}`;
    const confirmationMessage= `Thanks for your review .\n We truely appreciate your effort`;

    try{
        await sendEmail({
            reciever:process.env.SMPT_MAIL,
            subject:`Reviews`,
            message:reviewMessage,
        });
        await sendEmail({
            reciever:review.email,
            subject:`Greetings`,
            message:confirmationMessage,
        });
        res.status(200).json({
            success:true,
            message:`Email sent successfully`,
        });
    }catch(error){
        return next(new ErrorHandler(error.message,500));
    }
})

exports.getReview =CatchAsyncError(async(req,res,next)=>{
    const review = req.body;
    const reviewMessage= `Name :- ${review.name} \nEmail:- ${review.email}\nMessage:- ${review.message}`;
    const confirmationMessage= `Thanks for your review .\n We truely appreciate your effort`;

    try{
        await sendEmail({
            reciever:process.env.SMPT_MAIL,
            subject:`Reviews`,
            message:reviewMessage,
        });
        await sendEmail({
            reciever:review.email,
            subject:`Greetings`,
            message:confirmationMessage,
        });
        res.status(200).json({
            success:true,
            message:`Email sent successfully`,
        });
    }catch(error){
        return next(new ErrorHandler(error.message,500));
    }
});

// Subscribe Route
// exports.userSubscription=CatchAsyncError(async(req,res,next)=>{

//     try{

//         const newUserData={
//             subscription:req.body
//         }
//         console.log(req.user.id);
//         const user = await User.findByIdAndUpdate(req.user.id,newUserData,{new:true,runValidators:true,useFindAndModify:false});
//         getExpireMedicine();
//         res.status(200).json({
//             success:true,
//         })
//     }catch(error){
//         return next(new ErrorHandler(error.message,500));
//     }
// });