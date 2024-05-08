import { Schema, model } from "mongoose";

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "Reader",
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  data.id = _id;
  return data;
};

const User = model("User", UserSchema);

export default User;
