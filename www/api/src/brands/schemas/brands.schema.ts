import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { MultiLanguageSchema, SEOSchema } from "src/utils/objects.constant";

export type BrandsDocument = Brands & Document;

@Schema({ timestamps: true })
export class Brands {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  logo: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  seo: SEOSchema;

  @Prop({ required: true })
  content: MultiLanguageSchema[];

  @Prop({ required: false })
  headline: string;

  @Prop({ required: false })
  video: string;

  @Prop({ required: false })
  link: string;

  @Prop({ required: false, default: 0 })
  order: number;
}

export const BrandsSchema = SchemaFactory.createForClass(Brands);
