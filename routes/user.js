import UserController from "../controllers/User.js";

const UserRouter = [
  {
    type: "post",
    route: "/create",
    function: UserController.createUser,
  },
];

export default UserRouter;
