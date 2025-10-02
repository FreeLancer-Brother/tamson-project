import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { MultiLanguageSchema, SEOSchema } from "src/utils/objects.constant";
import { Brands } from "src/brands/schemas/brands.schema";

export type YatchTypesDocument = YatchTypes & Document;

@Schema({ timestamps: true })
export class YatchTypes {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  name: MultiLanguageSchema[];

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  seo: SEOSchema;

  @Prop({ required: true })
  content: MultiLanguageSchema[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brands', index: true })
  brand: Brands;
}

export const YatchTypesSchema = SchemaFactory.createForClass(YatchTypes);
