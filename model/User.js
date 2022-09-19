import { Schema, model, models } from "mongoose";

const user = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  linkedinID: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: false,
  },
});

const User = models.User || model("User", user);

export default User;
