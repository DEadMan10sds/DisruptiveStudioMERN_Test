import { connect } from "mongoose";

async function ConnectToDatabase(DATABASE_URL) {
  try {
    await connect(DATABASE_URL);
    console.log("Base de datos conectada correctamente");
  } catch (error) {
    console.log("Error al conectar la BD", error);
  }
}

export default ConnectToDatabase;
