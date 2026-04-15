import mongoose, { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  // A User is everything a Document is, plus whatever extra stuff I add here."

  username: string;
  email: string;
  password: string;

  profilePic?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },

    password: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = models.User || model<IUser>("User", UserSchema);

export default UserModel;
