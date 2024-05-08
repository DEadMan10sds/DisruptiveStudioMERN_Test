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
};

export default UserController;
