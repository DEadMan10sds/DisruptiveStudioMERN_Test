import GeneralController from "../controllers/general.js";

const generalRoutes = [
  {
    type: "get",
    route: "/health",
    function: GeneralController.health,
  },
  {
    type: "all",
    route: "*",
    function: GeneralController.routeNotFound,
  },
];

export default generalRoutes;
