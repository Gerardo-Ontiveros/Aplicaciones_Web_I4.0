import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import connectDBMongo from "./config/db";

const app = express(); //CREANDO SERVIDOR
const PORT = 3000; //NUMERO DE PUERTO

console.log("El servidor se esta alojando en el puerto 3000");
app.use(express.json()); //REQUEST EN TIPO JSON
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

connectDBMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`EL SERVIDOR ESTA EN EL PUERTO ${PORT}`);
  });
});
