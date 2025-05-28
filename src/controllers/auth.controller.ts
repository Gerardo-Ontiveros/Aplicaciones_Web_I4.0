import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToken";
import { cache } from "../utils/cache";
import { User } from "../models/auth/User";
//import dayjs from "datejs";

export const login = (req: Request, res: Response) => {
  /* Dentro del body del request buscar las variables de username y password*/
  const { username, password } = req.body;

  if (username !== "admin" || password !== "12345") {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const userID = "123456789";
  const accessToken = generateAccessToken(userID);

  cache.set(userID, accessToken, 60 * 15);
  return res.json({
    message: "Login exitoso",
    accessToken,
  });
};

export const getTimeToken = (req: Request, res: Response) => {
  const { id } = req.params;
  const ttl = cache.getTtl(id);

  if (!ttl) {
    return res.status(404).json({ message: "Token no encontrado" });
  }

  const now = Date.now();
  const timeToLifeSeconds = Math.floor((ttl - now) / 100);

  const expTime = timeToLifeSeconds;

  return res.json({
    timeToLifeSeconds,
    expTime,
  });
};

export const updateToken = (req: Request, res: Response) => {
  const { userId } = req.params;
  const ttl = cache.getTtl(userId);

  if (!ttl) {
    return res.status(404).json({ message: "Token no encontrado" });
  }

  const newTime: number = 60 * 15;
  cache.ttl(userId, newTime);
  return res.json({ message: "Actualizacion con exito" });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const userList = await User.find();
  return res.json({ userList });
};

export const getUserByUsername = async (req: Request, res: Response) => {
  const { userName } = req.params;

  const userByUsername = await User.find({ username: userName });

  if (userByUsername.length === 0) {
    return res.status(404).json({ message: "No se ha encontrado al usuario" });
  }

  return res.json({ userByUsername });
};

export const saveUser = async (req: Request, res: Response) => {
  try {
    const { name, username, email, phone, password, rol } = req.body;

    const newUser = new User({
      name,
      username,
      email,
      phone,
      password,
      rol,
      status: true,
    });

    const user = await User.create(newUser);

    return res.json({ user });
  } catch (e) {
    console.log(e);
  }
};
