import { Schema, Types, model, Document } from "mongoose";

export interface IRole extends Document {
  _id: Types.ObjectId;
  type: string;
  name: string;
  creationDate: Date;
  status: boolean;
  updateDate: Date;
}

const roleSchema = new Schema<IRole>({
  id: { type: Number, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  creationDate: { type: Date, required: true },
  status: { type: Boolean, required: true },
  updateDate: { type: Date, default: Date.now },
});

export const Role = model<IRole>("Role", roleSchema);
