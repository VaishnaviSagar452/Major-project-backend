import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser= asyncHandler(async(req,res)=>{
    // Implementation for registering user
     const {Fullname,email,username, password}= req.body
     console.log("email", email)

     if(
        [Fullname,email,username,password].some((field)=> field?.trim() === "")
     ){
        throw new ApiError(400,"All fields are required")
     }
     const existedUser =User.findOne({
          $or:[
            {email},
            {username}
          ]
     })
     if(existedUser){
        throw new ApiError(409, "User with this email or username already exists")
     }
       const avatarLocalPath = req.files?.avatar[0]?.path;
       const coverImageLocalPath =req.files?.coverImage[0]?.path;

       if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
       }

      const avatar = await UploadOnCloudinary(avatarLocalPath)
      const coverImage = await UploadOnCloudinary(coverImageLocalPath)

      if(!avatar){
         throw new ApiError(400, "Error while uploading avatar")
      }

      const user = await User.create({
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username : username.toLowercase()
      })

      const createdUser = await User.findById(user._id).select(
         "-password -refreshToken"
         )

         if(!createdUser){
            throw new ApiError(500, "Something went wrong while registering user")
         }

         return res.status(200).json(
            new ApiResponse(200, createdUser, "User registered successfully")
         )

})

export {registerUser}