import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { MultiLanguageSchema, SEOSchema } from "src/utils/objects.constant";
import { ProductLines } from "src/product-lines/schemas/product-lines.schema";

export type ProductsDocument = Products & Document;

@Schema({ timestamps: true })
export class Products {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  bannerImage: string;

  @Prop({ required: true })
  name: MultiLanguageSchema[];

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  seo: SEOSchema;

  @Prop({ required: true })
  specifications: [{
    label: MultiLanguageSchema[],
    value: MultiLanguageSchema[],
  }];

  @Prop({ required: true })
  content: MultiLanguageSchema[];

  @Prop({})
  interiorDesign: MultiLanguageSchema[];

  @Prop({})
  tabContents: [{
    label: MultiLanguageSchema[],
    content: MultiLanguageSchema[],
  }];

  @Prop({})
  designers: [{
    image: string;
    name: string,
    position: MultiLanguageSchema[],
  }];

  @Prop({})
  brochureLink: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductLines', index: true })
  productLine: ProductLines;

  @Prop({})
  galleries: [string];

  @Prop({ required: false, default: 0 })
  order: number;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
