import { Schema, Types, model, Document } from "mongoose";

export interface IOrder extends Document {
  _id: Types.ObjectId;
  creationDate: Date;
  orderCreatorUser: string;
  total: number;
  subtotal: number;
  status: boolean;
  updateDate: Date;
}

const orderSchema = new Schema<IOrder>({
  id: { type: Number, required: true },
  creationDate: { type: Date, required: true },
  orderCreatorUser: { type: String, required: true },
  total: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  status: { type: Boolean, required: true },
  updateDate: { type: Date, default: Date.now },
});

export const Order = model<IOrder>("Order", orderSchema);
