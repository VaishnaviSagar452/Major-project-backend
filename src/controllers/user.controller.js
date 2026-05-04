import {asyncHandler} from "../utils/asyncHandler.js";

const registerUser= asyncHandler(async(req,res)=>{
    // Implementation for registering user
     return res.status(200).json({
        message: "User registered successfully!!"
    })
})

export {registerUser}