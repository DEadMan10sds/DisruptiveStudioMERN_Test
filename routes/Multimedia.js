import MultimediaController from "../controllers/Multimedia.js";
import validateFields from "../middlewares/validateFields.js";
import validateJWT from "../middlewares/validateJWT.js";
import { isAdmin } from "../middlewares/validateRoles.js";

const MultimediaRouter = [
  {
    type: "get",
    route: "/thematic/:thematic",
    middlewares: [validateJWT, validateRoles(["Reader"]), validateFields],
    function: MultimediaController.getByThematic,
  },
  {
    type: "get",
    route: "/single/:id",
    middlewares: [validateJWT, validateRoles(["Reader"]), validateFields],
    function: MultimediaController.getById,
  },
  {
    type: "put",
    route: "/update/:id",
    middlewares: [
      validateJWT,
      isAdmin,
      validateRoles(["Creator"]),
      validateFields,
    ],
    function: MultimediaController.update,
  },
  {
    type: "delete",
    route: "/delete/:id",
    middlewares: [validateJWT, isAdmin, validateFields],
    function: MultimediaController.delete,
  },
  {
    type: "get",
    route: "/all",
    middlewares: [validateJWT, validateRoles(["Reader"]), validateFields],
    function: MultimediaController.getAll,
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
    function: MultimediaController.create,
  },
];

export default MultimediaRouter;
