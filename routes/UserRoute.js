import express from 'express';
import { createUser, getUserById, getUsers, updateUser } from '../controllers/UserController.js';
import upload from '../middlewere/multer.js';
import resizePhoto from '../middlewere/sharp.js';
import validate from '../middlewere/userSchema.js';
import userSchema from '../middlewere/userSchema.js';

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", upload.single("photo"), resizePhoto, validate(userSchema), createUser);
router.put("/:id", upload.single("photo"), resizePhoto, updateUser);

export default router