import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserByUsername,
  login,
  saveUser,
  updateUser,
  getTimeToken,
  updateToken,
} from "../controllers/auth.controller";

const router = Router();

/*
Utiliza el endpoint login por medio 
de la ruta /login-user y metodo post
*/

router.post("/login", login);
router.get("/getTime/:id", getTimeToken);
router.patch("/update/:userId", updateToken);
router.get("/users", getAllUsers);
router.post("/users/add", saveUser);
router.get("/users/name/:userName", getUserByUsername);
router.patch("/users/update/:id", updateUser);
router.delete("/users/:userID", deleteUser);

export default router;
