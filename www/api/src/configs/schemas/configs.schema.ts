import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { MultiLanguageSchema } from "src/utils/objects.constant";
import { Brands } from "src/brands/schemas/brands.schema";

export type ConfigsDocument = Configs & Document;

@Schema({ timestamps: true })
export class Configs {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  configKey: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  configValue: any;
}

export const ConfigsSchema = SchemaFactory.createForClass(Configs);
