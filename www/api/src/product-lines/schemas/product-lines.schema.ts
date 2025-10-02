import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { MultiLanguageSchema } from "src/utils/objects.constant";
import { YatchTypes } from "src/yatch-types/schemas/yatch-types.schema";

export type ProductLinesDocument = ProductLines & Document;

@Schema({ timestamps: true })
export class ProductLines {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  name: MultiLanguageSchema[];

  @Prop({ required: true })
  content: MultiLanguageSchema[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'YatchTypes', index: true })
  yatchType: YatchTypes;

  @Prop({ required: false, default: 0 })
  order: number;
}

export const ProductLinesSchema = SchemaFactory.createForClass(ProductLines);
