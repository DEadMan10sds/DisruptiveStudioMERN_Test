import { Schema, model } from "mongoose";

const MultimediaScheme = Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  thematic: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  content: {
    url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
  text: {
    type: String,
  },
});

MultimediaScheme.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  data.id = _id;
  return data;
};

const Multimedia = model("Multimedia", MultimediaScheme);

export default Multimedia;
