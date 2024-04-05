import { Router } from "express";
import UserRoutes from "./userRoutes.js";
import PostRoutes from "./postRoutes.js";
import CommentRoutes from "./commentRoutes.js";
const router = Router();

//middleware
//for user routes
router.use("/api/user", UserRoutes);

//for post routes
router.use("/api/post", PostRoutes);

//for comment routes
router.use("/api/comment", CommentRoutes);
export default router;
