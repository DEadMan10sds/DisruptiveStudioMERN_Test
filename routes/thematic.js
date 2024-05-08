import ThematicController from "../controllers/Thematic.js";
import validateFields from "../middlewares/validateFields.js";
import validateJWT from "../middlewares/validateJWT.js";
import { isAdmin } from "../middlewares/validateRoles.js";
import { validateRoles } from "../middlewares/validateRoles.js";

const thematicRouter = [
  {
    type: "delete",
    route: "/delete/:id",
    middlewares: [validateJWT, isAdmin, validateFields],
    function: ThematicController.delete,
  },
  {
    type: "get",
    route: "/getAll",
    middlewares: [validateJWT, validateRoles(["Reader"]), validateFields],
    function: ThematicController.getAll,
  },
  {
    type: "post",
    route: "/create",
    middlewares: [
      validateJWT,
      isAdmin,
      validateRoles(["Creator"]),
      validateFields,
    ],
    function: ThematicController.create,
  },
];

export default thematicRouter;
