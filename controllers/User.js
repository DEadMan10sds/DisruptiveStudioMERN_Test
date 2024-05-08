import generateJWT from "../helpers/createJWT.js";
import User from "../models/User.js";

const UserController = {
  createUser: async (req, res) => {
    const userData = req.body;

    try {
      const userNew = new User(userData);
      const userSaved = await userNew.save();

      return res.status(200).json({
        message: "User saved correctly",
        data: userSaved,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  getUser: async (req, res) => {
    const { id } = req.params;

    try {
      const findedUser = await User.findById(id);

      if (!findedUser)
        return res.status(400).json({
          message: "The user doesn't exists",
        });

      return res.status(200).json({
        message: "User finded",
        data: findedUser,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  login: async (req, res) => {
    const data = req.body;

    try {
      const existsUser = await User.find({ email: data.email });

      if (!existsUser)
        return res.status(400).json({
          message: "Review the user login data",
        });

      const token = await generateJWT(existsUser[0].id);

      return res.status(200).json({
        message: "Log in succesfully",
        user: existsUser,
        token,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

export default UserController;
