import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  comment: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
