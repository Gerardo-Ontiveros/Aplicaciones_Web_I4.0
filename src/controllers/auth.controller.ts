import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToken";
import { cache } from "../utils/cache";
import { User } from "../models/auth/User";
import {
  encryptionPassword,
  verifyPassword,
} from "../utils/encryptionPassword";
//import dayjs from "datejs";

export const login = async (req: Request, res: Response) => {
  /* Dentro del body del request buscar las variables de username y password*/
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const validPassword = await verifyPassword(password, user.password);

  if (!validPassword || !user) {
    return res
      .status(404)
      .json({ message: "El usuario o contraseña son incorrectos" });
  }

  const accessToken = generateAccessToken(user._id.toString());

  cache.set(user._id.toString(), accessToken, 60 * 15);
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

    const newPassword = await encryptionPassword(password); //Mandamos a llamar la funcion para encriptar la contraseña y lo guardamos en una variable

    const newUser = new User({
      name,
      username,
      email,
      phone,
      password: newPassword,
      rol,
      status: true,
    });

    const user = await User.create(newUser);

    return res.json({ user });
  } catch (e) {
    console.log(e);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { email, phone, password, rol, name } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "No existe este usuario" });
    }

    const userEmail = await User.find({ email });
    const newPassword = await encryptionPassword(password); //Mandamos a llamar la funcion para encriptar la contraseña y lo guardamos en una variable

    if (userEmail && userEmail.length > 0) {
      return res.status(426).json({ message: "El email debe ser unico" });
    }

    user.name = name;
    user.email = email;
    user.password = password != null ? newPassword : user.password; //Estabamos evaluando directamente el registro en lugar de lo que mandabamos al body
    user.rol = rol;
    user.phone = phone;

    const updateUser = await user.save();
    const passwordNoReturn = updateUser.toObject();
    delete passwordNoReturn.password; //Eliminamos el dato password del return para mas seguridad
    return res.json({ passwordNoReturn });
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const user = await User.findById(userID);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  user.status = false;
  user.deleteDate = new Date();

  await user.save();

  res.json({ message: "Eliminacion exitosa" });
};
