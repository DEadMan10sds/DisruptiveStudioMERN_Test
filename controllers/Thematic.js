import Thematic from "../models/Thematic.js";

const ThematicController = {
  create: async (req, res) => {
    const thematicData = req.body;

    try {
      const newThematic = new Thematic(thematicData);
      const thematicSave = await newThematic.save();

      return res.status(200).json({
        message: "Theme saved",
        data: thematicSave,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const allThemes = await Thematic.find();

      if (!allThemes.length)
        return res.status(400).json({
          message: "There are no themes",
        });

      return res.status(200).json({
        message: "Thematics",
        data: allThemes,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedThematic = await Thematic.findByIdAndDelete(id);

      if (!deletedThematic)
        return res.status(400).json({
          message: "Error, there's no theme",
        });

      return res.status(200).json({
        message: "Theme deleted",
        data: deletedThematic,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

export default ThematicController;
