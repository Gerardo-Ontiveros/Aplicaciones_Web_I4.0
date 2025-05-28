import mongoose from "mongoose";

const connectDBMongo = async (): Promise<void> => {
  const mongoUri = "mongodb://127.0.0.1:27017/admin";

  try {
    await mongoose.connect(mongoUri);
    console.log("Conexion exisota");
  } catch (e) {
    console.log("Error al conectarse con mongo: ", e);
  }
};

export default connectDBMongo;
