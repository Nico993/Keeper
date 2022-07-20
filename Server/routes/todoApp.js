import express from "express";
import * as usersController from "../controllers/todoApp.js";

const router = express.Router();

router.get("/users",usersController.getUsers);
router.post("/users",usersController.createUser);

router.post("/user",usersController.getUser);

router.patch("/:email",usersController.patchItem);
router.get("/:email",usersController.getItems);
router.delete("/:email/:id",usersController.deleteItem);

export default router;