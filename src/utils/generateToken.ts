import jwt from "jsonwebtoken";

const ACCESS_SECRET = "aPMna620Jursl";

export const generateAccessToken = (userID: string) => {
  return jwt.sign({ userID }, ACCESS_SECRET, {
    expiresIn: "15m",
  });
};
