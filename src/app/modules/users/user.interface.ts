import { Model } from "mongoose";

export type IUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

export type UserModel = Model<IUser>;
