import MultimediaController from "../controllers/Multimedia.js";

const MultimediaRouter = [
  {
    type: "get",
    route: "/thematic/:thematic",
    function: MultimediaController.getByThematic,
  },
  {
    type: "get",
    route: "/single/:id",
    function: MultimediaController.getById,
  },
  {
    type: "get",
    route: "/all",
    function: MultimediaController.getAll,
  },
  {
    type: "post",
    route: "/create",
    function: MultimediaController.create,
  },
];

export default MultimediaRouter;
