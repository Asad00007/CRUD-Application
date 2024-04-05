import { Router } from "express";
import {
  createComments,
  deleteComment,
  fetchComments,
  showComment,
} from "../Controller/commentController.js";

const router = Router();

router.post("/", createComments);
router.get("/", fetchComments);
router.get("/:id", showComment);
router.delete("/:id", deleteComment);

export default router;
