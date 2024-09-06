import { Router } from "express";
import { login, signup, getUserInfo } from "../controllers/auth_controller.js";
import { verifyToken } from "../middleware/auth_middleware.js";

const auth_route = Router();
auth_route.post("/signup", signup);
auth_route.post("/login", login);
auth_route.get("/user-info", verifyToken, getUserInfo);

export default auth_route;
