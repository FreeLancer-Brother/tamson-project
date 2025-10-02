import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import {
  MultiLanguageSchema,
  MultiLanguageSildeSchema,
} from "src/utils/objects.constant";

export type AboutUsDocument = AboutUs & Document;

@Schema({ timestamps: true })
export class AboutUs {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  title: MultiLanguageSchema[];

  @Prop({ required: true })
  file: MultiLanguageSchema[];

  @Prop({ required: true })
  description: MultiLanguageSchema[];

  @Prop({ required: true })
  slides: MultiLanguageSildeSchema[];
}

export const AboutUsSchema = SchemaFactory.createForClass(AboutUs);
