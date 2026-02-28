import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import { USER_ROLE } from "../../../enum/user";

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: USER_ROLE,
      default: USER_ROLE.ADMIN,
    },
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre<IUser>("save", async function () {
  const user = this as any;
  user.id = user._id;
});

const User = model<IUser, UserModel>("User", userSchema);
export default User;
