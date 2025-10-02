import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";

export type EmailAccountsDocument = EmailAccounts & Document;

@Schema({ timestamps: true })
export class EmailAccounts {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  mailServerAddress: string;

  @Prop({ required: true })
  mailServerPort: number;

  @Prop({ required: true })
  isTls: boolean;
}

export const EmailAccountsSchema = SchemaFactory.createForClass(EmailAccounts);
