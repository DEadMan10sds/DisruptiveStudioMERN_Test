import ThematicController from "../controllers/Thematic.js";

const thematicRouter = [
  {
    type: "delete",
    route: "/delete/:id",
    function: ThematicController.delete,
  },
  {
    type: "get",
    route: "/getAll",
    function: ThematicController.getAll,
  },
  {
    type: "post",
    route: "/create",
    function: ThematicController.create,
  },
];

export default thematicRouter;
