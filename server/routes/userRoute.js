import express from 'express';
import {verifyUser, verifyAdmin} from "../utils/verifyToken.js"

import {getUser,getAllUsers,updateUser,deleteUser,followUser, unfollowUser} from "../controllers/UserController.js"


const router = express.Router();

router.get("/:id",verifyUser, getUser)
router.get("/",verifyAdmin, getAllUsers)
router.put("/:id", updateUser)
router.delete("/:id", verifyUser, deleteUser)
router.put("/:id",verifyUser, followUser)
router.put(":id/unfollow", verifyUser, unfollowUser)


export default router;


