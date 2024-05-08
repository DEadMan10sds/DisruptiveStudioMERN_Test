import UserController from "../controllers/User.js";
import validateFields from "../middlewares/validateFields.js";
import validateJWT from "../middlewares/validateJWT.js";

const UserRouter = [
  {
    type: "get",
    route: "/single/:id",
    middlewares: [validateJWT, validateFields],
    function: UserController.getUser,
  },
  {
    type: "post",
    route: "/create",
    function: UserController.createUser,
  },
  {
    type: "post",
    route: "/login",
    function: UserController.login,
  },
];

export default UserRouter;
