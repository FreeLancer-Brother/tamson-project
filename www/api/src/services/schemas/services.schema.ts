import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { MultiLanguageSchema, SEOSchema } from "src/utils/objects.constant";
import { Brands } from "src/brands/schemas/brands.schema";

export type ServicesDocument = Services & Document;

@Schema({ timestamps: true })
export class Services {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  image: string;

  @Prop({})
  servicesBackground: string;

  @Prop({})
  servicesHeadImage: string;

  @Prop({ required: true })
  name: MultiLanguageSchema[];

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  seo: SEOSchema;

  @Prop({})
  title: MultiLanguageSchema[];

  @Prop({})
  content: MultiLanguageSchema[];

  @Prop({})
  content2: MultiLanguageSchema[];

  @Prop({})
  docks: [{
    image: string,
    title: MultiLanguageSchema[],
  }];

  @Prop({})
  galleries: [string];

  @Prop({})
  facilities: [{
    image: string,
    title: MultiLanguageSchema[],
  }];

  @Prop({})
  services: [{
    image: string,
    title: MultiLanguageSchema[],
    content: MultiLanguageSchema[],
  }];

  @Prop({})
  products: [{
    name: MultiLanguageSchema[],
    lenght: string,
    year: string,
    cabin: string,
    area: string,
    price: string,
    show: number,
    content: MultiLanguageSchema[],
    image1: string,
    image2: string,
    image3: string,
  }];

  @Prop({ required: true })
  type: number;
}

export const ServicesSchema = SchemaFactory.createForClass(Services);
