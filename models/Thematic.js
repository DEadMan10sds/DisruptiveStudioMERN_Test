import { Schema, model } from "mongoose";

const ThematicSchema = Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  /*content: [
    {
      type: Schema.Types.ObjectId,
      rel: "Multimedia",
    },
  ],*/
});

ThematicSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  data.id = _id;
  return data;
};

const Thematic = model("Thematic", ThematicSchema);

export default Thematic;
