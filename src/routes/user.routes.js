import { Router } from "express";
import { registerUser,logoutUser,loginUser,refreshAccessToken,
     changeCurrentPassword,
      UpdateAccountDetails,
       getCurrentUser,
       UpdateUserAvatar,
       UpdateUserCover,
       getUserChannelProfile,
       getWatchHistory
     } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyjwt} from "../middlewares/auth.middleware.js";


const router = Router();
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)


router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyjwt, logoutUser)
router.route("/refresh-access-token").post(refreshAccessToken)
router.route("/change-password").post(verifyjwt, changeCurrentPassword)
router.route("/current-user").get(verifyjwt, getCurrentUser)
router.route("/update-account").patch(verifyjwt, UpdateAccountDetails)
router.route("/avatar").patch(verifyjwt, upload.single("avatar"),UpdateUserAvatar)
router.route("/cover-image").patch(verifyjwt, upload.single("coverImage"),UpdateUserCover)
router.route("/c/:username").get(verifyjwt, getUserChannelProfile)
router.route("/watch-history").get(verifyjwt, getWatchHistory)


export default router;