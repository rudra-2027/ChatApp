import express from "express"
import { getUserProfile, login, logout, singup } from "../controller/user.controller.js"
import secureRoute from "../middleware/securRoute.js";
const router = express.Router();

router.post("/signup", singup)
router.post("/login", login)
router.post("/logout", logout)

router.get("/getUserProfile",secureRoute, getUserProfile)

export default router;