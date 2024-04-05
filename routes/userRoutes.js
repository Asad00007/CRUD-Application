import { Router } from "express";
import {
  createUser,
  deleteUser,
  fetchUsers,
  showUser,
  updateUser,
} from "../Controller/userController.js";
const router = Router();

router.post("/", createUser);
router.put("/:id", updateUser); //to update a record, we use put
router.get("/", fetchUsers);
router.get("/:id", showUser);
router.delete("/:id", deleteUser);

export default router;
