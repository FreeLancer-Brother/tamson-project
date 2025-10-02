import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { MultiLanguageSchema, SEOSchema } from "src/utils/objects.constant";

export type NewsDocument = News & Document;

@Schema({ timestamps: true })
export class News {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  seo: SEOSchema;

  @Prop({ required: true })
  title: MultiLanguageSchema[];

  @Prop({ required: true })
  content: MultiLanguageSchema[];

  @Prop({ required: true })
  type: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
