import { Router } from "express";
import { login } from "../controllers/auth.controller";

const router=Router();

/*
Utiliza el endpoint login por medio 
de la ruta /login-user y metodo post
*/

router.post('/login', login);


export default router