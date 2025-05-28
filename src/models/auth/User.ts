import { Schema, Types, model, Document } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  username: string;
  password: string;
  email: string;
  rol: string;
  phone: string;
  status: boolean;
  createDate: Date;
  deleteDate: Date;
}

const userScheme = new Schema<IUser>({
  name: {
    type: String,
    required: true, // Fixed from 'require' to 'required'
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rol: {
    type: String, // Fixed typo from 'tpye' to 'type'
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  deleteDate: {
    type: Date,
  },
});

export const User = model<IUser>("User", userScheme, "user");
