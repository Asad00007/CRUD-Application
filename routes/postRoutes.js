import { Router } from "express";
import {
  createPost,
  deletePost,
  fetchPosts,
  showPost,
  updatePost,
} from "../Controller/postController.js";

const router = Router();

router.get("/", fetchPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.get("/:id", showPost);
router.delete("/:id", deletePost);
export default router;
