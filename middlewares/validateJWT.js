import jwt from "jsonwebtoken";
import User from "../models/User.js";

const validateJWT = async (req, res, next) => {
  const token = req.header("xToken");
  if (!token) return res.status(400).json({ message: "The token is required" });

  try {
    const { id } = jwt.decode(token, process.env.SECRET_KEY);

    const existsUser = await User.findById(id);
    if (!existsUser)
      return res.status(401).json({ message: "The user doesn't exists" });

    req.user = existsUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Token not valid",
    });
  }
};

export default validateJWT;
