import express from "express";
import {createUser} from "../controller/UserController.mjs";
const router = express.Router();


router.post('/user', createUser);

export const userRoutes = router

