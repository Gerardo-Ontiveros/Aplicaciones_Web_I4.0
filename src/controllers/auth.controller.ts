import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {


    /* Dentro del body del request buscar las variables de username y password*/
    const {username,password} = req.body;


    if(username !== "admin" || password !== "12345"){
       return  res.status(401).json({message:"Credenciales incorrectas"})
    }

    return res.json({message:"Login exitoso"})

}