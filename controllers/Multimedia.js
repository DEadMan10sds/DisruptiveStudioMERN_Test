import Multimedia from "../models/Multimedia.js";
import cloudinary from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL);

const MultimediaController = {
  getAll: async (req, res) => {
    try {
      const allMultimedia = await Multimedia.find();

      if (!allMultimedia.length)
        return res.status(400).json({
          message: "There's no multimedia content",
        });

      return res.status(200).json({
        message: "Multimedia founded",
        data: allMultimedia,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  getByThematic: async (req, res) => {
    const { thematic } = req.params;

    try {
      const mediaByThematics = await Multimedia.find({ thematic });

      if (!mediaByThematics.length)
        return res.status(400).json({
          message: "There is no media for this thematic",
        });

      return res.status(200).json({
        message: "Media of thematic founded",
        data: mediaByThematics,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const findedMedia = await Multimedia.findById(id);
      if (!findedMedia)
        return res.status(400).json({
          message: "There's no data with this id",
        });

      return res.status(200).json({
        message: "Finded Media",
        data: findedMedia,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  create: async (req, res) => {
    const { data } = req.body;
    let parsedData = JSON.parse(data);

    try {
      if (req.files) {
        const mediaUrl = await cloudinary.v2.uploader.upload(
          req.files["img"].tempFilePath
        );
        parsedData.content = {
          url: mediaUrl.url,
          public_id: mediaUrl.public_id,
        };
      }

      const newMultimedia = new Multimedia(parsedData);
      const savedMultimedia = await newMultimedia.save();

      return res.status(200).json({
        message: "Media saved",
        data: savedMultimedia,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    let { data } = req.body;
    data = JSON.parse(data);
    try {
      const updatedMedia = await Multimedia.findByIdAndUpdate(id, data);

      if (req.files) {
        const mediaUrl = await cloudinary.v2.uploader.upload(
          req.files["img"].tempFilePath,
          {
            public_id: updatedMedia.content.public_id,
          }
        );
      }

      if (!updatedMedia)
        return res.status(400).json({
          message: "Media not updated",
          data: updatedMedia,
        });

      return res.status(200).json({
        message: "Media updated",
        data: updatedMedia,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const existsMedia = await Multimedia.findById(id);

      if (!existsMedia)
        return res.status(400).json({
          message: "There's no media with this id",
        });

      const deletedCloud = await cloudinary.v2.uploader.destroy(
        existsMedia.content.public_id
      );

      const deletedMedia = await Multimedia.findByIdAndDelete(id);

      return res.status(200).json({
        message: "Media deleted",
        data: [deletedCloud, deletedMedia],
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

export default MultimediaController;
