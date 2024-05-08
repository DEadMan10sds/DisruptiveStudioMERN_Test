const GeneralController = {
  health: (req, res) => {
    return res.status(200).json({ message: "Hello there" });
  },

  routeNotFound: (req, res) => {
    return res.status(404).redirect("/");
  },
};

export default GeneralController;
