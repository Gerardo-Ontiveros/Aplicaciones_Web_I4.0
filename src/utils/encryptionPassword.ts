const bcrypt = require("bcrypt");

export async function encryptionPassword(password: String) {
  const saltRounds = 10; // ESto se refiere al numero de veces que "hash" hara operaciones para que sea unico y poco modificable
  const hash = await bcrypt.hash(password, saltRounds); //Encriptamos la contraseña pasandolo por parametros (parametro 1: contraseña, parametro 2: numero de saltos)
  return hash; //Regresamos la contraseña encriptada
}

//Esta funcion nos permitira verificar las contraseñas encriptadas
export async function verifyPassword(
  enteredPassword: String,
  savedHash: String
) {
  const coincidence = await bcrypt.compare(enteredPassword, savedHash); //Se hace una comparacion entre la contraseña encriptada y la contraseña que esta guaradada
  return coincidence; //Regresamos el valor (True/False)
}
